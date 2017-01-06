import { dbDate, dateCompair } from '../utils/helpers';

class Panel {
  constructor() {
    // state
    this.active = false;

    // actions
    this.submitTodo;

    // form elements
    this.panelEL = document.querySelector('.todo-panel');
    this.form = this.panelEL.querySelector('#todo-panel-form');
    this.idINPUT = this.form.querySelector('[name=id]');
    this.titleINPUT = this.form.querySelector('[name=title]');
    this.dateGROUP = this.form.querySelector('[name=title]');
    this.dINPUT = this.form.querySelector('[name=day]');
    this.mINPUT = this.form.querySelector('[name=month]');
    this.yINPUT = this.form.querySelector('[name=year]');
    this.addBTN = this.form.querySelector('[data-panel-submit]');
    this.cancelBTN = this.form.querySelector('[data-panel-cancel]');
    this.err = this.form.querySelectorAll('.message');

    // events
    this.addBTN.addEventListener('click', e => {
      e.preventDefault();
      this.prepTodo();
    });

    this.cancelBTN.addEventListener('click', e => {
      e.preventDefault();
      this.close();
    });

    this.titleINPUT.addEventListener('blur', e => {
      this.validateTitle();
    });

    this.yINPUT.addEventListener('change', e => {
      this.validateDate();
    });

    this.dINPUT.addEventListener('change', e => {
      this.validateDate();
    });

    this.mINPUT.addEventListener('change', e => {
      this.validateDate();
    });
  }

  // open panel
  open(event, title = '', date = new Date(), id = null) {
    this.idINPUT.value = id;
    this.titleINPUT.value = title;
    this.setDate(date);
    this.active = true;
    this.panelEL.classList.add('active');
    this.panelEL.setAttribute('aria-hidden', false);
    this.titleINPUT.focus();
    this.addBTN.innerHTML = (id == null)? 'Add' : 'Edit';
  }

  // close panel
  close() {
    this.active = false;
    this.panelEL.classList.remove('active');
    this.panelEL.setAttribute('aria-hidden', true);
    this.form.reset();
    this.resetErrors();
  }

  // setting date group
  setDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    this.mINPUT.value = mm;
    this.dINPUT.value = dd;
    this.yINPUT.value = year;
  }

  validateTitle() {
    if (this.titleINPUT.value == '') {
      this.titleINPUT.classList.add('error');
      this.err[0].classList.add('active');
      return false;
    }else {
      this.titleINPUT.classList.remove('error');
      this.err[0].classList.remove('active');
      return true;
    }
  }

  validateDate() {
    const valid = dateCompair(`${this.mINPUT.value}/${this.dINPUT.value}/${this.yINPUT.value}`);
    if (valid) {
      this.dateGROUP.classList.add('error');
      this.err[1].classList.add('active');
      return false;
    }else {
      this.dateGROUP.classList.remove('error');
      this.err[1].classList.remove('active');
      return true;
    }
  }

  resetErrors() {
    this.titleINPUT.classList.remove('active');
    this.dateGROUP.classList.remove('active');
    this.err.forEach(err => err.classList.remove('active'));
  }

  // preping todo for server
  prepTodo() {
    const date = `${this.yINPUT.value}-${this.mINPUT.value}-${this.dINPUT.value}`;
    const todo = {
      id: this.idINPUT.value,
      title: this.titleINPUT.value,
      due_date: date,
      completed: false
    };

    if (this.validateTitle() && this.validateDate()) {
      this.submitTodo(todo);
      this.close();
    }
  }
}

export default Panel;
