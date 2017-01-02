import { dbDate, dateCompair } from './_helpers';
class Panel {
  constructor() {
    this.active = false;
    this.editing = false;
    this.currentEditId = null;
    this.newTodo = null;
    this.updateTodo = null;
    this.errors = [];
    this.newTodoBTN = document.querySelector('.js-new-todo');
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

  events() {
    this.cancelBTN.addEventListener('click', e => {
      e.preventDefault();
      this.close();
    });

    this.submitBTN.addEventListener('click', e => {
      e.preventDefault();
      this.prepTodo();
    });

    this.titleInput.addEventListener('blur', e => {
      this.validateTitle();
    });

    this.yearInput.addEventListener('change', e => {
      this.validateDueDate();
    });

    this.dayInput.addEventListener('change', e => {
      this.validateDueDate();
    });

    this.monthInput.addEventListener('change', e => {
      this.validateDueDate();
    });
  }

  open(event, title = '', date = new Date(), id = null) {
    this.titleInput.value = title;
    this.currentEditId = id;
    this.editing = !!(id);
    this.setDate(date);
    this.active = true;
    this.sectionEL.classList.add('active');
    this.sectionEL.setAttribute('aria-hidden', false);
    this.form.focus();
  }

  close() {
    this.active = false;
    this.sectionEL.classList.remove('active');
    this.sectionEL.setAttribute('aria-hidden', true);
    this.form.reset();
    this.newTodoBTN.focus();
  }

  setDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    this.monthInput.value = mm;
    this.dayInput.value = dd;
    this.yearInput.value = year;
  }

  validateTitle() {
    if (this.titleInput.value == '') {
      this.titleInput.classList.add('error');
      this.errorMessages[0].classList.add('active');
      return false;
    }else {
      this.titleInput.classList.remove('error');
      this.errorMessages[0].classList.remove('active');
      return true;
    }
  }

  validateDueDate() {
    const dateValid = dateCompair(`${this.monthInput.value}/${this.dayInput.value}/${this.yearInput.value}`);
    if (dateValid) {
      this.dateGroup.classList.add('error');
      this.errorMessages[1].classList.add('active');
      return false;
    }else {
      this.dateGroup.classList.remove('error');
      this.errorMessages[1].classList.remove('active');
      return true;
    }
  }

  prepTodo() {
    const title = encodeURIComponent(this.titleInput.value);
    const date = `${this.yearInput.value}-${this.monthInput.value}-${this.dayInput.value}`;
    const id = (this.currentEditId != null) ? `&id=${this.currentEditId}` : ``;
    const fields = `&title=${title}&due_date=${date}${id}`;
    if (this.validateTitle() && this.validateDueDate()) {
      if (this.editing) {
        this.updateTodo(fields);
      }else {
        this.newTodo(fields);
      }
      this.close();
    }
  }
}

export default Panel;
