import {EventEmitter} from 'events';

class State {
  constructor(ee = new EventEmitter()) {
    this.todos = [];
    this.activeTodos = [];
    this.callback = null;
    this.ee = ee;
  }

  on(name, fn) {
    this.ee.on(name, fn);
  }

  get() {
    const options = {method: 'GET'};
    this.request('All Todos',options);
  }

  post(message, todo) {
    let body = new FormData();
    for(let i in todo) {
      body.append(i, todo[i]);
    }
    const options = {method: 'POST', body: body};
    this.request(message, options);
  }

  delete(message, todo) {
    const options = {method: 'DELETE', body: JSON.stringify(todo)};
    this.request(message, options);
  }

  request(message, options) {
    const request = new Request('/api/', options);
    fetch(request)
      .then(response => response.json())
      .then(todos => {
        this.ee.emit(message, todos);
      });
  }
}

export default State;
