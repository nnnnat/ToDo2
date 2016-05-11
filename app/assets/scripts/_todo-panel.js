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
TodoPanel.prototype.init = function() {
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
    panel.validateTitleInput()
  });

  panel.dueMonthInput.addEventListener('change', function (e) {
    panel.validateDateInput()
  });

  panel.dueDayInput.addEventListener('change', function (e) {
    panel.validateDateInput()
  });

  panel.dueYearInput.addEventListener('change', function (e) {
    panel.validateDateInput()
  });
};

// actions
TodoPanel.prototype.open = function() {
  var panel = this;
  panel.setTodaysDate();
  panel.section.classList.add('active');
  panel.isActive = true;
  panel.section.setAttribute('aria-hidden', false);
  panel.section.setAttribute('aria-expanded', true);
  panel.form.focus();
};

TodoPanel.prototype.close = function() {
  var panel = this;
  panel.section.classList.remove('active');
  panel.section.setAttribute('aria-hidden', true);
  panel.section.setAttribute('aria-expanded', false);
  panel.isActive = false;
  panel.form.reset();
  panel.setTodaysDate();
};

// new task panel
TodoPanel.prototype.newTodo = function() {
  var panel = this;
  var title = encodeURIComponent(panel.titleInput.value);
  var dueDate = String(panel.dueYearInput.value+'-'+panel.dueMonthInput.value+'-'+panel.dueDayInput.value);

  if(panel.validateTitleInput() === true && panel.validateDateInput() === true) {
    var request = new XMLHttpRequest();

    request.open('GET', '?action=create&title='+title+'&due_date='+dueDate+'', true);

    request.onload = function() {
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

        }else {
          panel.close();
        }

      } else {
        console.log('server hit, request bad');
      }
    };

    request.onerror = function() {
      console.log('connection error');
    };

    request.send();
  }
};

// this still needs work
TodoPanel.prototype.editTodo = function(todo) {
  var panel = this;
  panel.titleInput.value = todo.title;
  var dueDate = String(panel.dueYearInput.value+'-'+panel.dueMonthInput.value+'-'+panel.dueDayInput.value);

  panel.open();
  console.log(todo);

  // if(panel.validateTitleInput(title) === true) {
  //   panel.close();
  // }
};

// helpers
TodoPanel.prototype.setTodaysDate = function() {
  var panel = this;
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  if (month < 10) { month = '0' + month; }

  panel.dueDayInput.value = (day < 10 ? '0'+day : day);
  panel.dueMonthInput.value = month;
  panel.dueYearInput.value = year;

  // clearing out any error messaging
  panel.titleInput.classList.remove('error');
  panel.errorMessage[0].classList.remove('active');

  panel.dueDateGroup.classList.remove('error');
  panel.errorMessage[1].classList.remove('active');
};

TodoPanel.prototype.validateTitleInput = function() {
  var panel = this;
  var title = encodeURIComponent(panel.titleInput.value);

  if(panel.titleInput.value === '') {
    panel.titleInput.classList.add('error');
    panel.errorMessage[0].classList.add('active');
    return false;
  }else {
    panel.titleInput.classList.remove('error');
    panel.errorMessage[0].classList.remove('active');
    return true;
  }
};

TodoPanel.prototype.validateDateInput = function() {
  var panel = this;
  var dueDate = String(panel.dueYearInput.value+'/'+panel.dueMonthInput.value+'/'+panel.dueDayInput.value);
  var currentDate = new Date();
  var dueDate = new Date(dueDate);
  currentDate.setHours(0,0,0,0);
  dueDate.setHours(0,0,0,0);

  if (currentDate.getTime() > dueDate.getTime()) {
    panel.dueDateGroup.classList.add('error');
    panel.errorMessage[1].classList.add('active');
    return false;
  }else {
    panel.dueDateGroup.classList.remove('error');
    panel.errorMessage[1].classList.remove('active');
    return true;
  }
};

// Exporting my module brah!
module.exports = TodoPanel;
