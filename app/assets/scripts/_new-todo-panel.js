class Panel {
  constructor() {
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

  events() {
    this.cancelBTN.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    this.submitBTN.addEventListener('click', (e) => {
      e.preventDefault();
      this.prepTodo();
    });
  }

  prepTodo() {
    const title = encodeURIComponent(this.titleInput.value);
    const date = `${this.yearInput.value}-${this.monthInput.value}-${this.dayInput.value}`;
    const id = (this.currentEditId != null) ? `&id=${this.currentEditId}` : ``;
    const fields = `&title=${title}&due_date=${date}${id}`;
    if (this.editing) {
      this.updateTodo(fields);
    }else {
      this.newTodo(fields);
    }
  }

  validate() {

  }

  setDate() {

  }
}

export default Panel;
