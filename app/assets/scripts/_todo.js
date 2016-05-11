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

Todo.prototype.init = function() {
  var todo = this;

  if (todo.complete === false) {
    todo.isOverdue();
  }

  todo.template();
  todo.events();
}

// todo's button events
Todo.prototype.events = function() {
  var todo = this;

  todo.primaryBTN.addEventListener('click', function(e) {
      if(todo.complete === false) {
        todo.done();
      }else {
        todo.reset();
      }
  });

  if(todo.deleteBTN !== null) {
    todo.deleteBTN.addEventListener('click', function(e) {
      todo.delete();
    });
  }

  if(todo.editBTN !== null) {
    todo.editBTN.addEventListener('click', function(e) {
      todo.edit();
    });
  }
};

// delete todo from the database and remove from DOM
Todo.prototype.delete = function() {
  var todo = this;

  todo.update('delete');
  todo.out(300);
};

// delete todo from the database and remove from DOM
Todo.prototype.edit = function() {
  var todo = this;
  todo.parent.todoPanel.editTodo(todo);
  //todo.update('delete');
  //todo.out(300);
};

// mark todo as complete in database and remove from DOM
Todo.prototype.done = function() {
  var todo = this;

  todo.update('done');
  todo.out(300);
};

// reset todo complete in database and remove from DOM
Todo.prototype.reset = function() {
  var todo = this;

  todo.update('reset');
  todo.out(300);
};

// needs work still!
Todo.prototype.isOverdue = function() {
  var todo = this;
  var currentDate = new Date();
  var dueDate = todo.dueDate.replace(/-/g, '\/');
  dueDate = new Date(dueDate);
  currentDate.setHours(0,0,0,0);
  dueDate.setHours(0,0,0,0);

  if (currentDate.getTime() > dueDate.getTime()) {
    todo.update('overdue');
  }

};

// this function send the request to the backend
Todo.prototype.update = function(action) {
  var todo = this;
  var request = new XMLHttpRequest();

  request.open('GET', '?action='+action+'&id='+todo.id, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
    } else {
      console.log('server hit, request bad');
    }
  };

  request.onerror = function() {
    console.log('connection error');
  };

  request.send();
};

// animating a todo into the todo list
Todo.prototype.in = function(delay) {
  var todo = this;

  setTimeout(function(){
    requestAnimationFrame(function() {
      todo.div.classList.remove('js-todo-in');
    });
  }, delay);
};

// animating a todo out of the todo list
Todo.prototype.out = function(delay) {
  var todo = this;

  setTimeout(function(){
    requestAnimationFrame(function() {
      todo.div.classList.add('js-todo-out');
      todo.parent.removeTodo(todo.id, delay);
    });
  }, delay);
};

// build markup for a todo
Todo.prototype.template = function() {
  var todo = this;
  var colors = ['blue','green','pink','purple'];
  var color = colors[Math.floor(Math.random() * colors.length)];
  // creating todo div
  todo.div = document.createElement('div');
  todo.div.className = (todo.complete === false ? 'todo js-todo-in '+color : 'todo complete js-todo-in '+color);
  todo.div.id = todo.id;
  todo.div.tabIndex = 0;

  var messageDiv = document.createElement('div');
  messageDiv.className = (todo.overdue === true && todo.complete === false ? 'message message--urgent active' : 'message message--urgent');

  var messageText = document.createElement('p');
  messageText.innerHTML = 'This ToDo is OverDo!';

  var infoDiv = document.createElement('div');
  infoDiv.className = 'todo-info';

  var subButtonDiv = document.createElement('div');
  subButtonDiv.className = 'todo-button-group button-group';

  var buttonDiv = document.createElement('div');
  buttonDiv.className = 'todo-primary-action';

  var dueDate = document.createElement('h2');
  dueDate.innerHTML = 'Due: <span class="text">'+todo.dueDate+'</span>';
  dueDate.setAttribute('class','todo-info__title');

  var title = document.createElement('h3');
  title.innerHTML = todo.title;
  title.setAttribute('class','todo-info__title');

  if(todo.complete === false) {
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
  }else {
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
