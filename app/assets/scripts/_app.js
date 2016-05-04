var TodoPanel = require('./_todo-panel.js');
var Todo = require('./_todo.js');


function App() {
  this.todoListDIV = document.getElementById('todo-list');
  this.newTodoBTN = document.getElementsByClassName('js-new-todo')[0];
  this.loadCompletedTodoBTN = document.getElementsByClassName('js-load-completed-todo')[0];
  this.todoPanel = null;
  this.todoData = null;
  this.todoList = [];
  this.todoLoaded = false;
  this.completedTodoLoaded = false;
  this.animationDelay = 150;
}

/*
  make request for todo data,
  create a new todo panel instance,
  attach app's events
*/
App.prototype.init = function() {
  var app = this;

  app.request(); // getting upcoming todo data
  app.todoPanel = new TodoPanel(app);
  app.todoPanel.init();
  app.events();

};

/*
  if no action is passed call the current todo list,
  else call the completed todo list
*/
App.prototype.request = function() {
  var app = this;
  var action = (app.completedTodoLoaded == false ? 'upcoming' : 'completed');
  var request = new XMLHttpRequest();

  request.open('GET', '?action='+action, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);

      app.todoData = data;
      app.addTodo();

    } else {
      console.log('server hit, request bad');
    }
  };

  request.onerror = function() {
    console.log('connection error');
  };

  request.send();

  app.completedTodoLoaded = !app.completedTodoLoaded;
};

/*
  App events new todo and completed todos button events
*/
App.prototype.events = function() {
  var app = this;

  // panel is closed open panel || close open panel
  app.newTodoBTN.addEventListener('click', function (e) {
    app.todoPanel.isActive === false ? app.todoPanel.open() : app.todoPanel.close();
  });

  // clear the current todo list and load the completed or upcoming todo
  app.loadCompletedTodoBTN.addEventListener('click', function (e) {
    app.clearTodo();
    app.completedTodoLoaded === false ? app.loadCompletedTodoBTN.innerHTML = 'Completed ToDos' : app.loadCompletedTodoBTN.innerHTML = 'Upcoming ToDos';
  });
};

/*
  loop through the todo data array and create a new todo OBJ for each one;
  init each todo, appending it to the #todo-list div,
  calling the in animation passing it a delay and incrementing the delay as more items are added
*/
App.prototype.addTodo = function() {
  var app = this;

  app.todoData.reverse();

  app.todoData.forEach(function(data){
    var todo = new Todo(data, app);

    app.todoList.push(todo);
    todo.init();
    app.todoListDIV.insertBefore(todo.div, app.todoListDIV.firstChild);
    todo.in(app.animationDelay);
    app.animationDelay+=50;
  });

  app.todoLoaded = true;
  app.animationDelay = 50;
};

/*
  clear out todo list,
  animate out each todo then remove OBJ from app.todoList[] and div from DOM
*/
App.prototype.clearTodo = function() {
  var app = this;

  app.todoList.reverse();

  for (var i = app.todoList.length - 1; i >= 0; i -= 1) {
    var todo = app.todoList[i];
    todo.out(app.animationDelay);
    app.animationDelay+=50;
    //app.removeTodo(todo.id);
  }

  app.animationDelay = 50;
};

// remove OBJ from app.todoList[] and div from DOM
App.prototype.removeTodo = function(id, delay) {
  var app = this;
  var delay = delay || app.animationDelay;
  var todo = app.todoList.filter(function(a){ return a.id == id })[0];
  var id = app.todoList.indexOf(todo);

  setTimeout(function(){
    todo.div.parentNode.removeChild(todo.div);
    app.todoList.splice(id,1);

    if (app.todoList.length === 0) {
      app.request();
    }
  }, delay );
};

// Exporting my module brah!
module.exports = App;
