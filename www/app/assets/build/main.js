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

	var _app = __webpack_require__(1);

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
	    window.app = new _app2.default();
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

	var _helpers = __webpack_require__(2);

	var _todo = __webpack_require__(3);

	var _todo2 = _interopRequireDefault(_todo);

	var _todoPanel = __webpack_require__(4);

	var _todoPanel2 = _interopRequireDefault(_todoPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function () {
	  function App() {
	    _classCallCheck(this, App);

	    this.activeTodos = [];
	    this.upcomingList = true;
	    this.listEL = document.querySelector('#todo-list');
	    this.listBTN = document.querySelector('.js-load-completed-todo');
	    this.newBTN = document.querySelector('.js-new-todo');
	    this.delay = 100;
	    this.todosColor = (0, _helpers.pickColor)();
	    this.panel = new _todoPanel2.default();
	    this.panel.newTodo = this.newTodo.bind(this);
	    this.panel.updateTodo = this.updateTodo.bind(this);
	    this.events();
	    this.createList();
	  }

	  _createClass(App, [{
	    key: 'events',
	    value: function events() {
	      this.listBTN.addEventListener('click', this.changeList.bind(this));
	      this.newBTN.addEventListener('click', this.panel.open.bind(this.panel));
	    }

	    // List Functions

	  }, {
	    key: 'changeList',
	    value: function changeList() {
	      var _this = this;

	      var listClear = new Promise(function (resolve, reject) {
	        setTimeout(resolve, _this.delay * _this.activeTodos.length);
	      });
	      this.todosColor = (0, _helpers.pickColor)();
	      this.upcomingList = !this.upcomingList;
	      this.listBTN.innerHTML = this.upcomingList ? 'Completed Todos' : 'Upcoming Todos';
	      this.clearList();
	      listClear.then(this.createList.bind(this));
	    }
	  }, {
	    key: 'createList',
	    value: function createList() {
	      var _this2 = this;

	      var todoType = this.upcomingList ? 'upcoming' : 'completed';
	      (0, _helpers.getTodos)(todoType, function (todos) {
	        return todos.map(function (todo) {
	          return _this2.createTodo(todo);
	        });
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
	      var _this4 = this;

	      this.activeTodos.sort(function (a, b) {
	        return new Date(b.dueDate) - new Date(a.dueDate);
	      });
	      this.activeTodos.map(function (todo) {
	        return _this4.listEL.removeChild(todo.div);
	      });
	      this.activeTodos.map(function (todo) {
	        return _this4.listEL.insertBefore(todo.div, _this4.listEL.firstChild);
	      });
	    }
	    // List Functions

	    // Todo Functions

	  }, {
	    key: 'createTodo',
	    value: function createTodo(todo) {
	      var newTodo = new _todo2.default(todo);
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
	      var color = (0, _helpers.colorDarken)(this.todosColor, -(this.activeTodos.indexOf(todo) / 50));
	      todo.div.setAttribute('style', ['color: ' + color]);
	      this.listEL.insertBefore(todo.div, this.listEL.firstChild);

	      todo.in(delay);
	      todo.rendered = true;
	    }
	  }, {
	    key: 'todoEdit',
	    value: function todoEdit(todo) {
	      this.panel.open(null, todo.title, todo.dueDate, todo.id);
	    }
	  }, {
	    key: 'removeTodo',
	    value: function removeTodo(todo) {
	      var _this5 = this;

	      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.delay * this.activeTodos.length;

	      todo.out(delay);
	      setTimeout(function () {
	        _this5.listEL.removeChild(todo.div);
	      }, delay + 300);
	      todo.rendered = false;
	      this.activeTodos = this.activeTodos.filter(function (aT) {
	        return todo.id != aT.id;
	      });
	    }
	  }, {
	    key: 'todoPrimaryAction',
	    value: function todoPrimaryAction(todo) {
	      var _this6 = this;

	      var action = todo.complete ? 'reset' : 'done';
	      (0, _helpers.updateTodo)(action, '&id=' + todo.id, function (response) {
	        var dt = _this6.activeTodos.find(function (dT) {
	          return dT.id == response.id;
	        });
	        dt.complete = !dt.complete;
	        _this6.removeTodo(dt, _this6.delay);
	      });
	    }
	  }, {
	    key: 'todoDelete',
	    value: function todoDelete(todo) {
	      var _this7 = this;

	      (0, _helpers.updateTodo)('delete', '&id=' + todo.id, function (id) {
	        _this7.removeTodo(todo, _this7.delay);
	      });
	    }
	  }, {
	    key: 'updateTodo',
	    value: function updateTodo(fields) {
	      var _this8 = this;

	      (0, _helpers.updateTodo)('edit', fields, function (todo) {
	        var activeTodo = _this8.activeTodos.find(function (aT) {
	          return aT.id == todo.id;
	        });
	        activeTodo.title = todo.title;
	        activeTodo.dueDate = todo.due_date;
	        activeTodo.refresh();
	        _this8.sortList();
	        _this8.panel.editing = false;
	      });
	    }
	  }, {
	    key: 'newTodo',
	    value: function newTodo(fields) {
	      var _this9 = this;

	      (0, _helpers.updateTodo)('create', fields, function (todo) {
	        _this9.createTodo(todo);
	        _this9.sortList();
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getTodos = getTodos;
	exports.updateTodo = updateTodo;
	exports.dbDate = dbDate;
	exports.viewDate = viewDate;
	exports.dateCompair = dateCompair;
	exports.colorDarken = colorDarken;
	exports.pickColor = pickColor;
	function getTodos() {
	  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'upcoming';
	  var callback = arguments[1];

	  fetch("?action=" + type).then(function (response) {
	    return response.json();
	  }).then(function (todos) {
	    return callback(todos);
	  });
	}

	function updateTodo(type, fields, callback) {
	  fetch("?action=" + type + fields).then(function (response) {
	    return response.json();
	  }).then(function (todo) {
	    return callback(todo);
	  });
	}

	function dbDate(date) {
	  var realDate = new Date(date);
	  var year = realDate.getFullYear();
	  var dd = realDate.getDate();
	  var mm = realDate.getMonth();

	  return mm + "/" + dd + "/" + year;
	}

	function viewDate(date) {
	  return date;
	}

	function dateCompair(date1) {
	  var date2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

	  var d1 = new Date(date1);
	  var d2 = new Date(date2);
	  d1.setHours(0, 0, 0, 0);
	  d2.setHours(0, 0, 0, 0);
	  return d1 < d2 ? true : false;
	}

	function colorDarken(col, amt) {
	  var f = col.split(","),
	      t = amt < 0 ? 0 : 255,
	      p = amt < 0 ? amt * -1 : amt,
	      R = parseInt(f[0].slice(4)),
	      G = parseInt(f[1]),
	      B = parseInt(f[2]);
	  return "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
	}

	function pickColor() {
	  var colors = ['rgb(0,117,217)', 'rgb(0,137,87)', 'rgb(220, 0, 173)', 'rgb(177, 13, 201)'];
	  return colors[Math.floor(Math.random() * colors.length)];
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Todo = function () {
	  function Todo(data) {
	    _classCallCheck(this, Todo);

	    console.log(data);
	    this.rendered = false;
	    this.id = data.id;
	    this.title = data.title;
	    this.dueDate = data.due_date;
	    this.overdue = (0, _helpers.dateCompair)(data.due_date);
	    this.complete = data.complete;
	    this.primaryAction = null;
	    this.delete = null;
	    this.edit = null;

	    this.div = null;
	    this.color = 'B10DC9';
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
	      var color = this.color;
	      // creating todo div
	      todo.div = document.createElement('div');
	      todo.div.setAttribute('style', ['color: #' + color]);
	      todo.div.className = todo.complete === false ? 'todo js-todo-in' : 'todo complete js-todo-in';
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
	      dueDate.className = 'todo-info__title';

	      var title = document.createElement('h3');
	      title.innerHTML = todo.title;
	      title.className = 'todo-info__title';

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Panel = function () {
	  function Panel() {
	    _classCallCheck(this, Panel);

	    this.active = false;
	    this.editing = false;
	    this.currentEditId = null;
	    this.newTodo = null;
	    this.updateTodo = null;
	    this.errors = [];
	    this.sectionEL = document.querySelector('.todo-panel');
	    this.form = this.sectionEL.querySelector('.todo-panel-form');
	    this.submitBTN = this.form.querySelector('.js-submit');
	    this.cancelBTN = this.form.querySelector('.js-cancel');
	    this.dateGroup = this.form.querySelector('#todo-due-date');
	    this.titleInput = this.form.querySelector('#todo-title');
	    this.monthInput = this.form.querySelector('#todo-due-month');
	    this.dayInput = this.form.querySelector('#todo-due-day');
	    this.yearInput = this.form.querySelector('#todo-due-year');
	    this.errorMessages = this.form.querySelectorAll('.message');
	    this.events();
	  }

	  _createClass(Panel, [{
	    key: 'events',
	    value: function events() {
	      var _this = this;

	      this.cancelBTN.addEventListener('click', function (e) {
	        e.preventDefault();
	        _this.close();
	      });

	      this.submitBTN.addEventListener('click', function (e) {
	        e.preventDefault();
	        _this.prepTodo();
	      });

	      this.titleInput.addEventListener('blur', function (e) {
	        _this.validateTitle();
	      });

	      this.yearInput.addEventListener('change', function (e) {
	        _this.validateDueDate();
	      });

	      this.dayInput.addEventListener('change', function (e) {
	        _this.validateDueDate();
	      });

	      this.monthInput.addEventListener('change', function (e) {
	        _this.validateDueDate();
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open(event) {
	      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
	      var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	      this.titleInput.value = title;
	      this.currentEditId = id;
	      this.editing = !!id;
	      this.setDate(date);
	      this.active = true;
	      this.sectionEL.classList.add('active');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.active = false;
	      this.sectionEL.classList.remove('active');
	      this.form.reset();
	    }
	  }, {
	    key: 'setDate',
	    value: function setDate(date) {
	      date = new Date(date);
	      var year = date.getFullYear();
	      var dd = date.getDate();
	      var mm = date.getMonth() + 1;

	      if (dd < 10) dd = '0' + dd;
	      if (mm < 10) mm = '0' + mm;

	      this.monthInput.value = mm;
	      this.dayInput.value = dd;
	      this.yearInput.value = year;
	    }
	  }, {
	    key: 'validateTitle',
	    value: function validateTitle() {
	      if (this.titleInput.value == '') {
	        this.titleInput.classList.add('error');
	        this.errorMessages[0].classList.add('active');
	        return false;
	      } else {
	        this.titleInput.classList.remove('error');
	        this.errorMessages[0].classList.remove('active');
	        return true;
	      }
	    }
	  }, {
	    key: 'validateDueDate',
	    value: function validateDueDate() {
	      var dateValid = (0, _helpers.dateCompair)(this.monthInput.value + '/' + this.dayInput.value + '/' + this.yearInput.value);
	      if (dateValid) {
	        this.dateGroup.classList.add('error');
	        this.errorMessages[1].classList.add('active');
	        return false;
	      } else {
	        this.dateGroup.classList.remove('error');
	        this.errorMessages[1].classList.remove('active');
	        return true;
	      }
	    }
	  }, {
	    key: 'prepTodo',
	    value: function prepTodo() {
	      var title = encodeURIComponent(this.titleInput.value);
	      var date = this.yearInput.value + '-' + this.monthInput.value + '-' + this.dayInput.value;
	      var id = this.currentEditId != null ? '&id=' + this.currentEditId : '';
	      var fields = '&title=' + title + '&due_date=' + date + id;
	      if (this.validateTitle() && this.validateDueDate()) {
	        if (this.editing) {
	          this.updateTodo(fields);
	        } else {
	          this.newTodo(fields);
	        }
	        this.close();
	      }
	    }
	  }]);

	  return Panel;
	}();

	exports.default = Panel;

/***/ }
/******/ ]);