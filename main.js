(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
App.prototype.init = function () {
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
App.prototype.request = function () {
  var app = this;
  var action = app.completedTodoLoaded === false ? 'upcoming' : 'completed';
  var request = new XMLHttpRequest();

  request.open('GET', '?action=' + action, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);

      app.todoData = data;
      app.addTodo();
    } else {
      console.log('server hit, request bad');
    }
  };

  request.onerror = function () {
    console.log('connection error');
  };

  request.send();

  app.completedTodoLoaded = !app.completedTodoLoaded;
};

/*
  App events new todo and completed todos button events
*/
App.prototype.events = function () {
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
App.prototype.addTodo = function () {
  var app = this;

  app.todoData.reverse();

  app.todoData.forEach(function (data) {
    var todo = new Todo(data, app);

    app.todoList.push(todo);
    todo.init();
    app.todoListDIV.insertBefore(todo.div, app.todoListDIV.firstChild);
    todo.in(app.animationDelay);
    app.animationDelay += 50;
  });

  app.todoLoaded = true;
  app.animationDelay = 50;
};

/*
  clear out todo list,
  animate out each todo then remove OBJ from app.todoList[] and div from DOM
*/
App.prototype.clearTodo = function () {
  var app = this;

  app.todoList.reverse();

  for (var i = app.todoList.length - 1; i >= 0; i -= 1) {
    var todo = app.todoList[i];
    todo.out(app.animationDelay);
    app.animationDelay += 50;
    //app.removeTodo(todo.id);
  }

  app.animationDelay = 50;
};

// remove OBJ from app.todoList[] and div from DOM
App.prototype.removeTodo = function (id, delay) {
  var app = this;
  var delay = delay || app.animationDelay;
  var todo = app.todoList.filter(function (a) {
    return a.id == id;
  })[0];
  var id = app.todoList.indexOf(todo);

  setTimeout(function () {
    todo.div.parentNode.removeChild(todo.div);
    app.todoList.splice(id, 1);

    if (app.todoList.length === 0) {
      app.request();
    }
  }, delay);
};

// Exporting my module brah!
exports.default = App;

},{"./_todo-panel.js":2,"./_todo.js":3}],2:[function(require,module,exports){
'use strict';

var Todo = require('./_todo.js');

function TodoPanel(app) {
  this.parent = app;
  this.section = document.getElementsByClassName('todo-panel')[0];
  this.form = document.getElementById('todo-panel-form');
  this.titleInput = document.getElementById('todo-title');
  this.dueDateGroup = document.getElementById('todo-due-date');
  this.dueMonthInput = document.getElementById('todo-due-month');
  this.dueDayInput = document.getElementById('todo-due-day');
  this.dueYearInput = document.getElementById('todo-due-year');
  this.addBTN = document.getElementsByClassName('js-submit')[0];
  this.cancelBTN = document.getElementsByClassName('js-cancel')[0];
  this.errorMessage = this.section.querySelectorAll('.message');
  this.isActive = false;
}

// init
TodoPanel.prototype.init = function () {
  var panel = this;

  panel.addBTN.addEventListener('click', function (e) {
    e.preventDefault();
    panel.newTodo();
  });

  panel.cancelBTN.addEventListener('click', function (e) {
    e.preventDefault();
    panel.close();
  });

  panel.titleInput.addEventListener('blur', function (e) {
    panel.validateTitleInput();
  });

  panel.dueMonthInput.addEventListener('change', function (e) {
    panel.validateDateInput();
  });

  panel.dueDayInput.addEventListener('change', function (e) {
    panel.validateDateInput();
  });

  panel.dueYearInput.addEventListener('change', function (e) {
    panel.validateDateInput();
  });
};

// actions
TodoPanel.prototype.open = function () {
  var panel = this;
  panel.setTodaysDate();
  panel.section.classList.add('active');
  panel.isActive = true;
  panel.section.setAttribute('aria-hidden', false);
  panel.section.setAttribute('aria-expanded', true);
  panel.form.focus();
};

TodoPanel.prototype.close = function () {
  var panel = this;
  panel.section.classList.remove('active');
  panel.section.setAttribute('aria-hidden', true);
  panel.section.setAttribute('aria-expanded', false);
  panel.isActive = false;
  panel.form.reset();
  panel.setTodaysDate();
};

// new task panel
TodoPanel.prototype.newTodo = function () {
  var panel = this;
  var title = encodeURIComponent(panel.titleInput.value);
  var dueDate = String(panel.dueYearInput.value + '-' + panel.dueMonthInput.value + '-' + panel.dueDayInput.value);

  if (panel.validateTitleInput() === true && panel.validateDateInput() === true) {
    var request = new XMLHttpRequest();

    request.open('GET', '?action=create&title=' + title + '&due_date=' + dueDate + '', true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);

        // I think this was me trying to get the new todo added to the list after it is created. Needs Work
        if (panel.parent.todoData.length > 0) {
          var todo = new Todo(data, panel.parent);
          panel.parent.todoData.push(data);
          panel.parent.todoList.push(todo);
          todo.init();
          panel.close();
          panel.parent.todoListDIV.insertBefore(todo.div, panel.parent.todoListDIV.firstChild);
          todo.in(panel.parent.animationDelay);
        } else {
          panel.close();
        }
      } else {
        console.log('server hit, request bad');
      }
    };

    request.onerror = function () {
      console.log('connection error');
    };

    request.send();
  }
};

// this still needs work
TodoPanel.prototype.editTodo = function (todo) {
  var panel = this;
  panel.titleInput.value = todo.title;
  var dueDate = String(panel.dueYearInput.value + '-' + panel.dueMonthInput.value + '-' + panel.dueDayInput.value);

  panel.open();
  console.log(todo);

  // if(panel.validateTitleInput(title) === true) {
  //   panel.close();
  // }
};

// helpers
TodoPanel.prototype.setTodaysDate = function () {
  var panel = this;
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  if (month < 10) {
    month = '0' + month;
  }

  panel.dueDayInput.value = day < 10 ? '0' + day : day;
  panel.dueMonthInput.value = month;
  panel.dueYearInput.value = year;

  // clearing out any error messaging
  panel.titleInput.classList.remove('error');
  panel.errorMessage[0].classList.remove('active');

  panel.dueDateGroup.classList.remove('error');
  panel.errorMessage[1].classList.remove('active');
};

TodoPanel.prototype.validateTitleInput = function () {
  var panel = this;
  var title = encodeURIComponent(panel.titleInput.value);

  if (panel.titleInput.value === '') {
    panel.titleInput.classList.add('error');
    panel.errorMessage[0].classList.add('active');
    return false;
  } else {
    panel.titleInput.classList.remove('error');
    panel.errorMessage[0].classList.remove('active');
    return true;
  }
};

TodoPanel.prototype.validateDateInput = function () {
  var panel = this;
  var dueDate = String(panel.dueYearInput.value + '/' + panel.dueMonthInput.value + '/' + panel.dueDayInput.value);
  var currentDate = new Date();
  var dueDate = new Date(dueDate);
  currentDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (currentDate.getTime() > dueDate.getTime()) {
    panel.dueDateGroup.classList.add('error');
    panel.errorMessage[1].classList.add('active');
    return false;
  } else {
    panel.dueDateGroup.classList.remove('error');
    panel.errorMessage[1].classList.remove('active');
    return true;
  }
};

// Exporting my module brah!
module.exports = TodoPanel;

},{"./_todo.js":3}],3:[function(require,module,exports){
'use strict';

function Todo(data, app) {
  this.parent = app;
  this.id = data.id;
  this.title = data.title;
  this.dueDate = data.due_date;
  this.overdue = data.overdue;
  this.complete = data.complete;
  this.div = null;
  this.deleteBTN = null;
  this.editBTN = null;
  this.primaryBTN = null;
}

Todo.prototype.init = function () {
  var todo = this;

  if (todo.complete === false) {
    todo.isOverdue();
  }

  todo.template();
  todo.events();
};

// todo's button events
Todo.prototype.events = function () {
  var todo = this;

  todo.primaryBTN.addEventListener('click', function (e) {
    if (todo.complete === false) {
      todo.done();
    } else {
      todo.reset();
    }
  });

  if (todo.deleteBTN !== null) {
    todo.deleteBTN.addEventListener('click', function (e) {
      todo.delete();
    });
  }

  if (todo.editBTN !== null) {
    todo.editBTN.addEventListener('click', function (e) {
      todo.edit();
    });
  }
};

// delete todo from the database and remove from DOM
Todo.prototype.delete = function () {
  var todo = this;

  todo.update('delete');
  todo.out(300);
};

// delete todo from the database and remove from DOM
Todo.prototype.edit = function () {
  var todo = this;
  todo.parent.todoPanel.editTodo(todo);
  //todo.update('delete');
  //todo.out(300);
};

// mark todo as complete in database and remove from DOM
Todo.prototype.done = function () {
  var todo = this;

  todo.update('done');
  todo.out(300);
};

// reset todo complete in database and remove from DOM
Todo.prototype.reset = function () {
  var todo = this;

  todo.update('reset');
  todo.out(300);
};

// needs work still!
Todo.prototype.isOverdue = function () {
  var todo = this;
  var currentDate = new Date();
  var dueDate = todo.dueDate.replace(/-/g, '\/');
  dueDate = new Date(dueDate);
  currentDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (currentDate.getTime() > dueDate.getTime()) {
    todo.update('overdue');
  }
};

// this function send the request to the backend
Todo.prototype.update = function (action) {
  var todo = this;
  var request = new XMLHttpRequest();

  request.open('GET', '?action=' + action + '&id=' + todo.id, true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
    } else {
      console.log('server hit, request bad');
    }
  };

  request.onerror = function () {
    console.log('connection error');
  };

  request.send();
};

// animating a todo into the todo list
Todo.prototype.in = function (delay) {
  var todo = this;

  setTimeout(function () {
    requestAnimationFrame(function () {
      todo.div.classList.remove('js-todo-in');
    });
  }, delay);
};

// animating a todo out of the todo list
Todo.prototype.out = function (delay) {
  var todo = this;

  setTimeout(function () {
    requestAnimationFrame(function () {
      todo.div.classList.add('js-todo-out');
      todo.parent.removeTodo(todo.id, delay);
    });
  }, delay);
};

// build markup for a todo
Todo.prototype.template = function () {
  var todo = this;
  var colors = ['blue', 'green', 'pink', 'purple'];
  var color = colors[Math.floor(Math.random() * colors.length)];
  // creating todo div
  todo.div = document.createElement('div');
  todo.div.className = todo.complete === false ? 'todo js-todo-in ' + color : 'todo complete js-todo-in ' + color;
  todo.div.id = todo.id;
  todo.div.tabIndex = 0;

  var messageDiv = document.createElement('div');
  messageDiv.className = todo.overdue === true && todo.complete === false ? 'message message--urgent active' : 'message message--urgent';

  var messageText = document.createElement('p');
  messageText.innerHTML = 'This ToDo is OverDo!';

  var infoDiv = document.createElement('div');
  infoDiv.className = 'todo-info';

  var subButtonDiv = document.createElement('div');
  subButtonDiv.className = 'todo-button-group button-group';

  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'todo-primary-action';

  var dueDate = document.createElement('h2');
  dueDate.innerHTML = 'Due: <span class="text">' + todo.dueDate + '</span>';
  dueDate.setAttribute('class', 'todo-info__title');

  var title = document.createElement('h3');
  title.innerHTML = todo.title;
  title.setAttribute('class', 'todo-info__title');

  if (todo.complete === false) {
    todo.primaryBTN = document.createElement('button');
    todo.primaryBTN.innerHTML = 'Done';
    todo.primaryBTN.className = 'button button--primary button--large js-todo-complete';

    todo.editBTN = document.createElement('button');
    todo.editBTN.innerHTML = 'Edit';
    todo.editBTN.className = 'button button--secondary js-todo-edit';

    todo.deleteBTN = document.createElement('button');
    todo.deleteBTN.innerHTML = 'Delete';
    todo.deleteBTN.className = 'button button--secondary js-todo-delete';

    subButtonDiv.appendChild(todo.editBTN);
    subButtonDiv.appendChild(todo.deleteBTN);
    buttonDiv.appendChild(todo.primaryBTN);
  } else {
    todo.primaryBTN = document.createElement('button');
    todo.primaryBTN.innerHTML = 'Undo';
    todo.primaryBTN.className = 'button button--primary button--large js-todo-undo ';

    buttonDiv.appendChild(todo.primaryBTN);
  }

  // attach all the pieces to the main div
  messageDiv.appendChild(messageText);
  infoDiv.appendChild(dueDate);
  infoDiv.appendChild(title);
  infoDiv.appendChild(subButtonDiv);
  todo.div.appendChild(messageDiv);
  todo.div.appendChild(infoDiv);
  todo.div.appendChild(buttonDiv);
};

// Exporting my module brah!
module.exports = Todo;

},{}],4:[function(require,module,exports){
'use strict';

var _app = require('./_app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ready = false; // This is needed to prevent onreadystatechange being run twice

document.onreadystatechange = function () {
  if (ready) {
    return;
  }
  // interactive = DOMContentLoaded & complete = window.load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ready = true;
    console.log(ready);
    var app = new _app2.default();
    app.init();
  }
};

},{"./_app":1}]},{},[4]);
