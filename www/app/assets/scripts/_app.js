import { getTodos, updateTodo, pickColor, colorDarken, dateCompair } from './_helpers';
import State from './_state';
import Todo from './_todo';
import Panel from './_todo-panel';

class App {
  constructor() {
    this.state = new State();
    this.activeTodos = [];
    this.upcomingList = true;
    this.listEL = document.querySelector('#todo-list');
    this.listBTN = document.querySelector('.js-load-completed-todo');
    this.newBTN = document.querySelector('.js-new-todo');
    this.delay = 100;
    this.todosColor = pickColor();
    this.panel = new Panel();
    this.panel.newTodo = this.newTodo.bind(this);
    this.panel.updateTodo = this.updateTodo.bind(this);
    this.events();
    this.createList();
    this.state.on('All Todos', todos => todos.map(todo => this.createTodo(todo)));
    this.state.on('New Todo', todo => this.createTodo(todo));
    this.state.on('Updated Todo', todo => console.log(todo));

  }

  events() {
    this.listBTN.addEventListener('click', this.changeList.bind(this));
    this.newBTN.addEventListener('click', this.panel.open.bind(this.panel));
    // TODO: when the new todo panel is opened we need to reload the upcoming todos list.
  }

  // List Functions
  changeList() {
    let listClear = new Promise((resolve, reject) => {
      setTimeout(resolve, this.delay * this.activeTodos.length );
    });
    this.todosColor = pickColor();
    this.upcomingList = !this.upcomingList;
    this.listBTN.innerHTML = (this.upcomingList) ? 'Completed Todos' : 'Upcoming Todos';
    this.clearList();
    listClear.then(this.createList.bind(this));
  }

  createList() {
    //const todoType = (this.upcomingList) ? 'upcoming' : 'completed';
    //getTodos('all', todos => todos.map(todo => this.createTodo(todo)));
    this.state.get();
  }

  clearList() {
    this.activeTodos.reverse().map(todo => this.removeTodo(todo));
  }

  sortList() {
    this.activeTodos.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
    this.activeTodos.map(todo => this.listEL.removeChild(todo.div));
    this.activeTodos.map(todo => this.listEL.insertBefore(todo.div, this.listEL.firstChild));
  }
  // List Functions

  // Todo Functions
  createTodo(todo) {
    const newTodo = new Todo(todo);
    newTodo.primaryAction = this.todoPrimaryAction.bind(this);
    newTodo.delete = this.todoDelete.bind(this);
    newTodo.edit = this.todoEdit.bind(this);
    this.activeTodos = [...this.activeTodos, newTodo ];
    if (!newTodo.rendered) this.addTodo(newTodo);
  }

  addTodo(todo) {
    const delay = this.delay * this.activeTodos.indexOf(todo);
    const color = colorDarken(this.todosColor, -(this.activeTodos.indexOf(todo)/50));
    todo.div.setAttribute('style',[`color: ${color}`]);
    this.listEL.insertBefore(todo.div, this.listEL.firstChild);

    todo.in(delay);
    todo.rendered = true;
  }

  todoEdit(todo) {
    this.panel.open(null, todo.title, todo.dueDate, todo.id);
  }

  removeTodo(todo, delay = this.delay * this.activeTodos.length) {
    todo.out(delay);
    setTimeout(() => {this.listEL.removeChild(todo.div)}, delay + 300);
    todo.rendered = false;
    this.activeTodos = this.activeTodos.filter(aT => todo.id != aT.id);
  }

  todoPrimaryAction(todo) {
    const action = (todo.complete) ? 'reset' : 'done';
    updateTodo(action, `&id=${todo.id}`, response => {
      let dt = this.activeTodos.find(dT => dT.id == response.id);
      dt.complete = !dt.complete;
      this.removeTodo(dt, this.delay);
    })
  }

  todoDelete(todo) {
    updateTodo('delete', `&id=${todo.id}`, id => {
      this.removeTodo(todo, this.delay);
    });
  }

  updateTodo(fields) {
    updateTodo('edit', fields, todo => {
      let activeTodo = this.activeTodos.find(aT => aT.id == todo.id);
      activeTodo.title = todo.title;
      activeTodo.dueDate = todo.due_date;
      activeTodo.refresh();
      this.sortList();
      this.panel.editing = false;
    });
  }

  newTodo(fields) {
    console.log(fields);
    // updateTodo('create', fields, todo => {
    //   this.createTodo(todo);
    //   this.sortList();
    // });
  }
  // Todo Functions
}

export default App;
