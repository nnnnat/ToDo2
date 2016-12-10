/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _newApp = __webpack_require__(1);

	var _newApp2 = _interopRequireDefault(_newApp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ready = false; // This is needed to prevent onreadystatechange being run twice
	//import { requestData, getData } from './_helpers';

	document.onreadystatechange = function () {
	  if (ready) {
	    return;
	  }
	  // interactive = DOMContentLoaded & complete = window.load
	  if (document.readyState === 'interactive' || document.readyState === 'complete') {
	    ready = true;

	    fetch('?action=all').then(function (response) {
	      if (response.status >= 400) {
	        throw new Error("Bad response from server");
	      }
	      return response.json();
	    }).then(function (data) {
	      window.app = new _newApp2.default(data);
	    });
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _newTodo = __webpack_require__(2);

	var _newTodo2 = _interopRequireDefault(_newTodo);

	var _newTodoPanel = __webpack_require__(3);

	var _newTodoPanel2 = _interopRequireDefault(_newTodoPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function () {
	  function App(data) {
	    _classCallCheck(this, App);

	    this.todos = data;
	    this.upcomingList = true;
	    this.activeTodos = [];
	    this.listEL = document.querySelector('#todo-list');
	    this.listBTN = document.querySelector('.js-load-completed-todo');
	    this.newBTN = document.querySelector('.js-new-todo');
	    this.delay = 100;
	    this.panel = new _newTodoPanel2.default();
	    this.panel.toggle = this.togglePanel.bind(this);
	    this.panel.newTodo = this.newTodo.bind(this);
	    this.panel.updateTodo = this.updateTodo.bind(this);
	    this.events();
	    this.createList();
	  }

	  _createClass(App, [{
	    key: 'events',
	    value: function events() {
	      this.listBTN.addEventListener('click', this.changeList.bind(this));
	      this.newBTN.addEventListener('click', this.panel.toggle);
	    }

	    // List Functions

	  }, {
	    key: 'changeList',
	    value: function changeList() {
	      var _this = this;

	      var listClear = new Promise(function (resolve, reject) {
	        setTimeout(resolve, _this.delay * _this.activeTodos.length);
	      });
	      this.upcomingList = !this.upcomingList;
	      this.listBTN.innerHTML = this.upcomingList ? 'Completed Todos' : 'Upcoming Todos';
	      this.clearList();
	      listClear.then(this.createList.bind(this));
	    }
	  }, {
	    key: 'createList',
	    value: function createList() {
	      var _this2 = this;

	      var list = this.upcomingList ? this.todos.filter(function (todo) {
	        return todo.complete === false;
	      }) : this.todos.filter(function (todo) {
	        return todo.complete === true;
	      });
	      list.map(function (todo) {
	        return _this2.createTodo(todo);
	      });
	    }
	  }, {
	    key: 'clearList',
	    value: function clearList() {
	      var _this3 = this;

	      this.activeTodos.reverse().map(function (todo) {
	        return _this3.removeTodo(todo);
	      });
	    }
	  }, {
	    key: 'sortList',
	    value: function sortList() {
	      this.activeTodos.sort(function (a, b) {
	        return new Date(a.dueDate) - new Date(b.dueDate);
	      });
	    }
	    // List Functions

	    // Todo Panel Functions

	  }, {
	    key: 'togglePanel',
	    value: function togglePanel() {
	      this.panel.active = !this.panel.active;
	      this.panel.sectionEL.classList.toggle('active');
	    }
	    // Todo Panel Functions

	    // Todo Functions

	  }, {
	    key: 'createTodo',
	    value: function createTodo(todo) {
	      var newTodo = new _newTodo2.default(todo);
	      newTodo.primaryAction = this.todoPrimaryAction.bind(this);
	      newTodo.delete = this.todoDelete.bind(this);
	      newTodo.edit = this.todoEdit.bind(this);
	      this.activeTodos = [].concat(_toConsumableArray(this.activeTodos), [newTodo]);
	      if (!newTodo.rendered) this.addTodo(newTodo);
	    }
	  }, {
	    key: 'addTodo',
	    value: function addTodo(todo) {
	      var delay = this.delay * this.activeTodos.indexOf(todo);
	      this.listEL.insertBefore(todo.div, this.listEL.firstChild);
	      todo.in(delay);
	      todo.rendered = true;
	    }
	  }, {
	    key: 'todoEdit',
	    value: function todoEdit(todo) {
	      this.togglePanel();
	      this.panel.titleInput.value = todo.title;
	      this.panel.editing = true;
	      this.panel.currentEditId = todo.id;
	    }
	  }, {
	    key: 'removeTodo',
	    value: function removeTodo(todo) {
	      var _this4 = this;

	      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.delay * this.activeTodos.length;

	      this.activeTodos = this.activeTodos.filter(function (aT) {
	        return todo.id != aT.id;
	      });
	      todo.out(delay);
	      setTimeout(function () {
	        _this4.listEL.removeChild(todo.div);
	      }, delay + 300);
	      todo.rendered = false;
	    }
	  }, {
	    key: 'todoPrimaryAction',
	    value: function todoPrimaryAction(todo) {
	      var _this5 = this;

	      var action = todo.complete ? 'reset' : 'done';
	      var dt = this.todos.find(function (dT) {
	        return dT.id == todo.id;
	      });
	      fetch('?action=' + action + '&id=' + todo.id).then(function (response) {
	        return response.json();
	      }).then(function (data) {
	        dt.complete = !dt.complete;
	        _this5.removeTodo(todo, _this5.delay);
	      });
	    }
	  }, {
	    key: 'todoDelete',
	    value: function todoDelete(todo) {
	      var _this6 = this;

	      fetch('?action=delete&id=' + todo.id).then(function (response) {
	        return response.json();
	      }).then(function (data) {
	        _this6.todos.splice(_this6.todos.indexOf(todo), 1);
	        _this6.removeTodo(todo, _this6.delay);
	      });
	    }
	  }, {
	    key: 'updateTodo',
	    value: function updateTodo(fields) {
	      var _this7 = this;

	      fetch('?action=edit' + fields).then(function (response) {
	        return response.json();
	      }).then(function (data) {
	        var dt = _this7.todos.find(function (dT) {
	          return dT.id == data.id;
	        });
	        var at = _this7.activeTodos.find(function (aT) {
	          return aT.id == data.id;
	        });
	        dt.title = data.title;
	        dt.due_date = data.due_date;
	        at.title = data.title;
	        at.dueDate = data.due_date;
	        at.refresh();
	        _this7.togglePanel();
	        _this7.panel.editing = false;
	      });
	    }
	  }, {
	    key: 'newTodo',
	    value: function newTodo(fields) {
	      var _this8 = this;

	      fetch('?action=create' + fields).then(function (response) {
	        return response.json();
	      }).then(function (data) {
	        _this8.togglePanel();
	        _this8.todos.push(data);
	        _this8.createTodo(data);
	      });
	    }
	    // Todo Functions

	  }]);

	  return App;
	}();

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Todo = function () {
	  function Todo(data) {
	    _classCallCheck(this, Todo);

	    this.redered = false;
	    this.id = data.id;
	    this.title = data.title;
	    this.dueDate = data.due_date;
	    this.overdue = data.overdue;
	    this.complete = data.complete;
	    this.primaryAction = null;
	    this.delete = null;
	    this.edit = null;

	    this.div = null;
	    this.deleteBTN = null;
	    this.editBTN = null;
	    this.primaryBTN = null;

	    this.build();
	    this.events();
	  }

	  _createClass(Todo, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this.primaryBTN.addEventListener('click', function () {
	        _this.primaryAction(_this);
	      });

	      if (this.complete === false) {
	        this.deleteBTN.addEventListener('click', function () {
	          _this.delete(_this);
	        });

	        this.editBTN.addEventListener('click', function () {
	          _this.edit(_this);
	        });
	      }
	    }
	  }, {
	    key: 'in',
	    value: function _in(delay) {
	      var todo = this;

	      setTimeout(function () {
	        requestAnimationFrame(function () {
	          todo.div.classList.remove('js-todo-in');
	        });
	      }, delay);
	    }
	  }, {
	    key: 'out',
	    value: function out(delay) {
	      var todo = this;

	      setTimeout(function () {
	        requestAnimationFrame(function () {
	          todo.div.classList.add('js-todo-out');
	        });
	      }, delay);
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.div.querySelector('h3.todo-info__title').innerHTML = this.title;
	      this.div.querySelector('h2.todo-info__title span.text').innerHTML = this.dueDate;
	    }
	  }, {
	    key: 'build',
	    value: function build() {
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
	    }
	  }]);

	  return Todo;
	}();

	exports.default = Todo;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Panel = function () {
	  function Panel() {
	    _classCallCheck(this, Panel);

	    this.active = false;
	    this.editing = false;
	    this.currentEditId = null;
	    this.toggle = null;
	    this.newTodo = null;
	    this.updateTodo = null;
	    this.sectionEL = document.querySelector('.todo-panel');
	    this.form = this.sectionEL.querySelector('.todo-panel-form');
	    this.submitBTN = this.form.querySelector('.js-submit');
	    this.cancelBTN = this.form.querySelector('.js-cancel');
	    this.titleInput = this.form.querySelector('#todo-title');
	    this.monthInput = this.form.querySelector('#todo-due-month');
	    this.dayInput = this.form.querySelector('#todo-due-day');
	    this.yearInput = this.form.querySelector('#todo-due-year');
	    this.events();
	  }

	  _createClass(Panel, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this.cancelBTN.addEventListener('click', function (e) {
	        e.preventDefault();
	        _this.toggle();
	      });

	      this.submitBTN.addEventListener('click', function (e) {
	        e.preventDefault();
	        _this.prepTodo();
	      });
	    }
	  }, {
	    key: 'prepTodo',
	    value: function prepTodo() {
	      var title = encodeURIComponent(this.titleInput.value);
	      var date = this.yearInput.value + '-' + this.monthInput.value + '-' + this.dayInput.value;
	      var id = this.currentEditId != null ? '&id=' + this.currentEditId : '';
	      var fields = '&title=' + title + '&due_date=' + date + id;
	      if (this.editing) {
	        this.updateTodo(fields);
	      } else {
	        this.newTodo(fields);
	      }
	    }
	  }, {
	    key: 'validate',
	    value: function validate() {}
	  }, {
	    key: 'setDate',
	    value: function setDate() {}
	  }]);

	  return Panel;
	}();

	exports.default = Panel;

/***/ }
/******/ ]);