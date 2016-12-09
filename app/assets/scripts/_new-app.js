import Todo from './_new-todo';
import Panel from './_new-todo-panel';

class App {
  constructor(data) {
    this.todos = data;
    this.upcomingList = true;
    this.activeTodos = [];
    this.listEL = document.querySelector('#todo-list');
    this.listBTN = document.querySelector('.js-load-completed-todo');
    this.newBTN = document.querySelector('.js-new-todo');
    this.delay = 100;
    this.panel = new Panel();
    this.panel.toggle = this.togglePanel.bind(this);
    this.panel.newTodo = this.newTodo.bind(this);
    this.panel.updateTodo = this.updateTodo.bind(this);
    this.events();
    this.createList();
  }

  events() {
    this.listBTN.addEventListener('click', this.changeList.bind(this));
    this.newBTN.addEventListener('click', this.panel.toggle);
  }

  // List Functions
  changeList() {
    let listClear = new Promise((resolve, reject) => {
      setTimeout(resolve, this.delay * this.activeTodos.length );
    });
    this.upcomingList = !this.upcomingList;
    this.listBTN.innerHTML = (this.upcomingList) ? 'Completed Todos' : 'Upcoming Todos';
    this.clearList();
    listClear.then(this.createList.bind(this));
  }

  createList() {
    const list = (this.upcomingList) ? this.todos.filter(todo => todo.complete === false) : this.todos.filter(todo => todo.complete === true);
    list.map(todo => this.createTodo(todo));
  }

  clearList() {
    this.activeTodos.reverse().map(todo => this.removeTodo(todo));
  }

  sortList() {
    this.activeTodos.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  // List Functions

  // Todo Panel Functions
  togglePanel() {
    this.panel.active = !this.panel.active;
    this.panel.sectionEL.classList.toggle('active');
  }
  // Todo Panel Functions

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
    this.listEL.insertBefore(todo.div, this.listEL.firstChild);
    todo.in(delay);
    todo.rendered = true;
  }

  todoEdit(todo) {
    this.togglePanel();
    this.panel.titleInput.value = todo.title;
    this.panel.editing = true;
    this.panel.currentEditId = todo.id;
  }

  removeTodo(todo, delay = this.delay * this.activeTodos.length) {
    this.activeTodos = this.activeTodos.filter((aT) => todo.id != aT.id);
    todo.out(delay);
    setTimeout(() => {this.listEL.removeChild(todo.div)}, delay + 300);
    todo.rendered = false;
  }

  todoPrimaryAction(todo) {
    const action = (todo.complete) ? 'reset' : 'done';
    let dt = this.todos.find(dT => dT.id == todo.id);
    fetch(`?action=${action}&id=${todo.id}`)
    .then(response => response.json())
    .then(data => {
      dt.complete = !dt.complete;
      this.removeTodo(todo, this.delay);
    });
  }

  todoDelete(todo) {
    fetch(`?action=delete&id=${todo.id}`)
    .then(response => response.json())
    .then(data => {
      this.todos.splice(this.todos.indexOf(todo),1);
      this.removeTodo(todo, this.delay);
    });
  }

  updateTodo(fields) {
    fetch(`?action=edit${fields}`)
    .then(response => response.json())
    .then(data => {
      let dt = this.todos.find(dT => dT.id == data.id);
      let at = this.activeTodos.find(aT => aT.id == data.id);
      dt.title = data.title;
      dt.due_date = data.due_date;
      at.title = data.title;
      at.dueDate = data.due_date;
      at.refresh();
      this.togglePanel();
      this.panel.editing = false;
    });
  }

  newTodo(fields) {
    fetch(`?action=create${fields}`)
    .then(response => response.json())
    .then(data => {
      this.togglePanel();
      this.todos.push(data);
      this.createTodo(data);
    });
  }
  // Todo Functions
}

export default App;
