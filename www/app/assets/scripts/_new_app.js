import { pickColor, colorDarken, dateCompair } from './_helpers';
import State from './_state';
import Todo from './_todo';
import Panel from './_todo-panel';

class App {
  constructor() {
    // state
    this.state = new State();
    this.todos = [];
    this.activeTodos = [];
    this.displayUpcoming = true;

    // dom
    this.panel = new Panel();
    this.panel.newTodo = this.panelSubmitAction.bind(this);
    this.listEL = document.querySelector('#todo-list');
    this.toggleListBTN = document.querySelector('[data-toggle-list]');
    this.newTodoBTN = document.querySelector('[data-new-todo]');

    // animation & colors
    this.delay = 200;
    this.color = pickColor();

    // state events
    this.state.on('All Todos', this.allTodos.bind(this));
    this.state.on('Updated Todo', todo => this.updatedTodo.bind(this));
    this.state.on('Completed Todo', todo => this.completedTodo(todo));
    this.state.on('Delete Todo', todo => this.deleteTodo(todo));

    // dom events
    this.toggleListBTN.addEventListener('click', this.toggleList.bind(this));
    this.newTodoBTN.addEventListener('click', this.panel.open.bind(this.panel));

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
    this.addTodo(todo);
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
  updateTodo() {
      let activeTodo = this.activeTodos.find(aT => aT.id == todo.id);
      activeTodo.title = todo.title;
      activeTodo.dueDate = todo.due_date;
      activeTodo.refresh();
      //this.sortList();
      //this.panel.editing = false
  }

  // new todo

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

  //
  todoPrimaryAction(todo) {
    const todoData = {
      id: todo.id,
      title: todo.title,
      due_date: todo.dueDate,
      completed: !todo.completed
    }
    this.state.post('Completed Todo', todoData);
  }

  todoEditAction(todo) {
    console.log(`edit action clicked!`);
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
    console.log('panel submit');
    console.log(todo);
  }
}

export default App;
