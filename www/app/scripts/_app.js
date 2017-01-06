import { pickColor, colorDarken, dateCompair, dbDate } from './_helpers';
import State from './_state';
import Todo from './_todo';
import Panel from './_panel';

class App {
  constructor() {
    // state
    this.state = new State();
    this.todos = [];
    this.activeTodos = [];
    this.displayUpcoming = true;

    // dom
    this.panel = new Panel();
    this.panel.submitTodo = this.panelSubmitAction.bind(this);
    this.listEL = document.querySelector('#todo-list');
    this.toggleListBTN = document.querySelector('[data-toggle-list]');
    this.newTodoBTN = document.querySelector('[data-new-todo]');

    // animation & colors
    this.delay = 100;
    this.color = pickColor();

    // state events
    this.state.on('All Todos', this.allTodos.bind(this));
    this.state.on('Updated Todo', todo => this.updateTodo(todo));
    this.state.on('New Todo', todo => this.newTodo(todo));
    this.state.on('Completed Todo', todo => this.completedTodo(todo));
    this.state.on('Delete Todo', todo => this.deleteTodo(todo));

    // dom events
    this.toggleListBTN.addEventListener('click', this.toggleList.bind(this));
    this.newTodoBTN.addEventListener('click', e => {
      if (!this.displayUpcoming) this.toggleList();
      this.panel.open();
    });

    // calling in my data
    this.state.get();
  }

  // =====================
  // todo list manegment
  // =====================

  // when the state returns all the todos
  allTodos(todos) {
    this.todos = todos;
    this.createList();
  }

  //
  toggleList() {
    let listClear = new Promise((resolve, reject) => {
      setTimeout(resolve, this.delay * this.activeTodos.length );
    });
    this.color = pickColor();
    this.displayUpcoming = !this.displayUpcoming;
    this.toggleListBTN.innerHTML = (this.displayUpcoming) ? 'Completed Todos' : 'Upcoming Todos';
    this.clearList();
    listClear.then(this.createList.bind(this));
  }

  createList() {
    const todos = this.todos.filter(todo => todo.completed != this.displayUpcoming);
    todos.map(todoData => this.initTodo(todoData));
  }

  clearList() {
    this.activeTodos.reverse().map(todo => this.removeTodo(todo));
  }

  sortList() {
    this.activeTodos.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
    this.activeTodos.map(todo => this.listEL.removeChild(todo.div));
    this.activeTodos.map(todo => this.listEL.insertBefore(todo.div, this.listEL.firstChild));
  }

  // ========================
  // todo manegment
  // ========================

  // init todo with the todoData from server
  initTodo(data) {
    const todo = new Todo(data);
    todo.primaryAction = this.todoPrimaryAction.bind(this);
    todo.edit = this.todoEditAction.bind(this);
    todo.delete = this.todoDeleteAction.bind(this);
    this.activeTodos = [...this.activeTodos, todo ];
    if (!todo.rendered) this.addTodo(todo);
  }

  // adding the newly created todo to the DOM
  addTodo(todo) {
    const delay = this.delay * this.activeTodos.indexOf(todo);
    const color = colorDarken(this.color, -(this.activeTodos.indexOf(todo)/50));
    todo.div.setAttribute('style',[`color: ${color}`]);
    this.listEL.insertBefore(todo.div, this.listEL.firstChild);
    todo.in(delay);
    todo.rendered = true;
  }

  // removing a todo from the DOM
  removeTodo(todo, delay = this.delay * this.activeTodos.length) {
    todo.out(delay);
    setTimeout(() => {this.listEL.removeChild(todo.div)}, delay + 300);
    todo.rendered = false;
    this.activeTodos = this.activeTodos.filter(aT => todo.id != aT.id);
  }

  // updated todo
  updateTodo(todo) {
    let activeTodo = this.activeTodos.find(aT => aT.id == todo.id);
    let dataTodo = this.todos.find(dT => dT.id == todo.id);
    activeTodo.title = todo.title;
    activeTodo.dueDate = todo.due_date;
    dataTodo.title = todo.title;
    dataTodo.dueDate = todo.due_date;
    activeTodo.refresh();
    this.sortList();
  }

  // new todo
  newTodo(todo) {
    this.todos.push(todo);
    this.initTodo(todo);
    this.sortList();
  }

  // completed todo
  completedTodo(todo) {
    let activeTodo = this.activeTodos.find(dT => dT.id == todo.id);
    let dataTodo = this.todos.find(dT => dT.id == todo.id);
    activeTodo.completed = !activeTodo.completed;
    dataTodo.completed = !dataTodo.completed;
    this.removeTodo(activeTodo, this.delay);
  }

  // delete todo
  deleteTodo(id) {
    let activeTodo = this.activeTodos.find(dT => dT.id == id);
    this.todos = this.todos.filter(dT => dT.id != id);
    this.removeTodo(activeTodo, this.delay);
  }

  // =====================
  // action manegment
  // =====================
  todoPrimaryAction(todo) {
    console.log(dbDate(todo.dueDate));
    const todoData = {
      id: todo.id,
      title: todo.title,
      due_date: dbDate(todo.dueDate),
      completed: !todo.completed
    }
    this.state.post('Completed Todo', todoData);
  }

  todoEditAction(todo) {
    this.panel.open(null, todo.title, todo.dueDate, todo.id);
  }

  todoDeleteAction(todo) {
    const todoData = {
      id: todo.id,
      title: todo.title,
      due_date: todo.dueDate,
      completed: !todo.completed
    }
    this.state.delete('Delete Todo', todoData);
  }

  panelSubmitAction(todo) {
    const message = (todo.id == '') ? 'New Todo' : 'Updated Todo';
    const id = (todo.id == '') ? null : todo.id;
    const todoData = {
      id: id,
      title: todo.title,
      due_date: todo.due_date,
      completed: todo.completed
    };
    this.state.post(message, todoData);
  }
}

export default App;
