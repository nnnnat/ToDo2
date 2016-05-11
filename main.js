!function e(t,o,n){function i(d,r){if(!o[d]){if(!t[d]){var s="function"==typeof require&&require;if(!r&&s)return s(d,!0);if(a)return a(d,!0);var u=new Error("Cannot find module '"+d+"'");throw u.code="MODULE_NOT_FOUND",u}var l=o[d]={exports:{}};t[d][0].call(l.exports,function(e){var o=t[d][1][e];return i(o?o:e)},l,l.exports,e,t,o,n)}return o[d].exports}for(var a="function"==typeof require&&require,d=0;d<n.length;d++)i(n[d]);return i}({1:[function(e,t,o){function n(){this.todoListDIV=document.getElementById("todo-list"),this.newTodoBTN=document.getElementsByClassName("js-new-todo")[0],this.loadCompletedTodoBTN=document.getElementsByClassName("js-load-completed-todo")[0],this.todoPanel=null,this.todoData=null,this.todoList=[],this.todoLoaded=!1,this.completedTodoLoaded=!1,this.animationDelay=150}var i=e("./_todo-panel.js"),a=e("./_todo.js");n.prototype.init=function(){var e=this;e.request(),e.todoPanel=new i(e),e.todoPanel.init(),e.events()},n.prototype.request=function(){var e=this,t=0==e.completedTodoLoaded?"upcoming":"completed",o=new XMLHttpRequest;o.open("GET","?action="+t,!0),o.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);e.todoData=t,e.addTodo()}else console.log("server hit, request bad")},o.onerror=function(){console.log("connection error")},o.send(),e.completedTodoLoaded=!e.completedTodoLoaded},n.prototype.events=function(){var e=this;e.newTodoBTN.addEventListener("click",function(t){e.todoPanel.isActive===!1?e.todoPanel.open():e.todoPanel.close()}),e.loadCompletedTodoBTN.addEventListener("click",function(t){e.clearTodo(),e.completedTodoLoaded===!1?e.loadCompletedTodoBTN.innerHTML="Completed ToDos":e.loadCompletedTodoBTN.innerHTML="Upcoming ToDos"})},n.prototype.addTodo=function(){var e=this;e.todoData.reverse(),e.todoData.forEach(function(t){var o=new a(t,e);e.todoList.push(o),o.init(),e.todoListDIV.insertBefore(o.div,e.todoListDIV.firstChild),o["in"](e.animationDelay),e.animationDelay+=50}),e.todoLoaded=!0,e.animationDelay=50},n.prototype.clearTodo=function(){var e=this;e.todoList.reverse();for(var t=e.todoList.length-1;t>=0;t-=1){var o=e.todoList[t];o.out(e.animationDelay),e.animationDelay+=50}e.animationDelay=50},n.prototype.removeTodo=function(e,t){var o=this,t=t||o.animationDelay,n=o.todoList.filter(function(t){return t.id==e})[0],e=o.todoList.indexOf(n);setTimeout(function(){n.div.parentNode.removeChild(n.div),o.todoList.splice(e,1),0===o.todoList.length&&o.request()},t)},t.exports=n},{"./_todo-panel.js":2,"./_todo.js":3}],2:[function(e,t,o){function n(e){this.parent=e,this.section=document.getElementsByClassName("todo-panel")[0],this.form=document.getElementById("todo-panel-form"),this.titleInput=document.getElementById("todo-title"),this.dueDateGroup=document.getElementById("todo-due-date"),this.dueMonthInput=document.getElementById("todo-due-month"),this.dueDayInput=document.getElementById("todo-due-day"),this.dueYearInput=document.getElementById("todo-due-year"),this.addBTN=document.getElementsByClassName("js-submit")[0],this.cancelBTN=document.getElementsByClassName("js-cancel")[0],this.errorMessage=this.section.querySelectorAll(".message"),this.isActive=!1}var i=e("./_todo.js");n.prototype.init=function(){var e=this;e.addBTN.addEventListener("click",function(t){t.preventDefault(),e.newTodo()}),e.cancelBTN.addEventListener("click",function(t){t.preventDefault(),e.close()}),e.titleInput.addEventListener("blur",function(t){e.validateTitleInput()}),e.dueMonthInput.addEventListener("change",function(t){e.validateDateInput()}),e.dueDayInput.addEventListener("change",function(t){e.validateDateInput()}),e.dueYearInput.addEventListener("change",function(t){e.validateDateInput()})},n.prototype.open=function(){var e=this;e.setTodaysDate(),e.section.classList.add("active"),e.isActive=!0,e.section.setAttribute("aria-hidden",!1),e.section.setAttribute("aria-expanded",!0),e.form.focus()},n.prototype.close=function(){var e=this;e.section.classList.remove("active"),e.section.setAttribute("aria-hidden",!0),e.section.setAttribute("aria-expanded",!1),e.isActive=!1,e.form.reset(),e.setTodaysDate()},n.prototype.newTodo=function(){var e=this,t=encodeURIComponent(e.titleInput.value),o=String(e.dueYearInput.value+"-"+e.dueMonthInput.value+"-"+e.dueDayInput.value);if(e.validateTitleInput()===!0&&e.validateDateInput()===!0){var n=new XMLHttpRequest;n.open("GET","?action=create&title="+t+"&due_date="+o,!0),n.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);if(e.parent.todoData.length>0){var o=new i(t,e.parent);e.parent.todoData.push(t),e.parent.todoList.push(o),o.init(),e.close(),e.parent.todoListDIV.insertBefore(o.div,e.parent.todoListDIV.firstChild),o["in"](e.parent.animationDelay)}else e.close()}else console.log("server hit, request bad")},n.onerror=function(){console.log("connection error")},n.send()}},n.prototype.editTodo=function(e){var t=this;t.titleInput.value=e.title;String(t.dueYearInput.value+"-"+t.dueMonthInput.value+"-"+t.dueDayInput.value);t.open(),console.log(e)},n.prototype.setTodaysDate=function(){var e=this,t=new Date,o=t.getMonth()+1,n=t.getDate(),i=t.getFullYear();10>o&&(o="0"+o),e.dueDayInput.value=10>n?"0"+n:n,e.dueMonthInput.value=o,e.dueYearInput.value=i,e.titleInput.classList.remove("error"),e.errorMessage[0].classList.remove("active"),e.dueDateGroup.classList.remove("error"),e.errorMessage[1].classList.remove("active")},n.prototype.validateTitleInput=function(){var e=this;encodeURIComponent(e.titleInput.value);return""===e.titleInput.value?(e.titleInput.classList.add("error"),e.errorMessage[0].classList.add("active"),!1):(e.titleInput.classList.remove("error"),e.errorMessage[0].classList.remove("active"),!0)},n.prototype.validateDateInput=function(){var e=this,t=String(e.dueYearInput.value+"/"+e.dueMonthInput.value+"/"+e.dueDayInput.value),o=new Date,t=new Date(t);return o.setHours(0,0,0,0),t.setHours(0,0,0,0),o.getTime()>t.getTime()?(e.dueDateGroup.classList.add("error"),e.errorMessage[1].classList.add("active"),!1):(e.dueDateGroup.classList.remove("error"),e.errorMessage[1].classList.remove("active"),!0)},t.exports=n},{"./_todo.js":3}],3:[function(e,t,o){function n(e,t){this.parent=t,this.id=e.id,this.title=e.title,this.dueDate=e.due_date,this.overdue=e.overdue,this.complete=e.complete,this.div=null,this.deleteBTN=null,this.editBTN=null,this.primaryBTN=null}n.prototype.init=function(){var e=this;e.complete===!1&&e.isOverdue(),e.template(),e.events()},n.prototype.events=function(){var e=this;e.primaryBTN.addEventListener("click",function(t){e.complete===!1?e.done():e.reset()}),null!==e.deleteBTN&&e.deleteBTN.addEventListener("click",function(t){e["delete"]()}),null!==e.editBTN&&e.editBTN.addEventListener("click",function(t){e.edit()})},n.prototype["delete"]=function(){var e=this;e.update("delete"),e.out(300)},n.prototype.edit=function(){var e=this;e.parent.todoPanel.editTodo(e)},n.prototype.done=function(){var e=this;e.update("done"),e.out(300)},n.prototype.reset=function(){var e=this;e.update("reset"),e.out(300)},n.prototype.isOverdue=function(){var e=this,t=new Date,o=e.dueDate.replace(/-/g,"/");o=new Date(o),t.setHours(0,0,0,0),o.setHours(0,0,0,0),t.getTime()>o.getTime()&&e.update("overdue")},n.prototype.update=function(e){var t=this,o=new XMLHttpRequest;o.open("GET","?action="+e+"&id="+t.id,!0),o.onload=function(){if(this.status>=200&&this.status<400){JSON.parse(this.response)}else console.log("server hit, request bad")},o.onerror=function(){console.log("connection error")},o.send()},n.prototype["in"]=function(e){var t=this;setTimeout(function(){requestAnimationFrame(function(){t.div.classList.remove("js-todo-in")})},e)},n.prototype.out=function(e){var t=this;setTimeout(function(){requestAnimationFrame(function(){t.div.classList.add("js-todo-out"),t.parent.removeTodo(t.id,e)})},e)},n.prototype.template=function(){var e=this,t=["blue","green","pink","purple"],o=t[Math.floor(Math.random()*t.length)];e.div=document.createElement("div"),e.div.className=e.complete===!1?"todo js-todo-in "+o:"todo complete js-todo-in "+o,e.div.id=e.id,e.div.tabIndex=0;var n=document.createElement("div");n.className=e.overdue===!0&&e.complete===!1?"message message--urgent active":"message message--urgent";var i=document.createElement("p");i.innerHTML="This ToDo is OverDo!";var a=document.createElement("div");a.className="todo-info";var d=document.createElement("div");d.className="todo-button-group button-group";var r=document.createElement("div");r.className="todo-primary-action";var s=document.createElement("h2");s.innerHTML='Due: <span class="text">'+e.dueDate+"</span>",s.setAttribute("class","todo-info__title");var u=document.createElement("h3");u.innerHTML=e.title,u.setAttribute("class","todo-info__title"),e.complete===!1?(e.primaryBTN=document.createElement("button"),e.primaryBTN.innerHTML="Done",e.primaryBTN.className="button button--primary button--large js-todo-complete",e.editBTN=document.createElement("button"),e.editBTN.innerHTML="Edit",e.editBTN.className="button button--secondary js-todo-edit",e.deleteBTN=document.createElement("button"),e.deleteBTN.innerHTML="Delete",e.deleteBTN.className="button button--secondary js-todo-delete",d.appendChild(e.editBTN),d.appendChild(e.deleteBTN),r.appendChild(e.primaryBTN)):(e.primaryBTN=document.createElement("button"),e.primaryBTN.innerHTML="Undo",e.primaryBTN.className="button button--primary button--large js-todo-undo ",r.appendChild(e.primaryBTN)),n.appendChild(i),a.appendChild(s),a.appendChild(u),a.appendChild(d),e.div.appendChild(n),e.div.appendChild(a),e.div.appendChild(r)},t.exports=n},{}],4:[function(e,t,o){var n=e("./_app.js"),i=!1;document.onreadystatechange=function(){if(!i&&("interactive"===document.readyState||"complete"===document.readyState)){i=!0;var e=new n;e.init()}}},{"./_app.js":1}]},{},[4]);