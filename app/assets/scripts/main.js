var App = require('./_app.js');
var ready = false; // This is needed to prevent onreadystatechange being run twice

document.onreadystatechange = function () {
  if (ready) {
    return;
  }
  // interactive = DOMContentLoaded & complete = window.load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ready = true;

    var app = new App();
    app.init();
  }
};
