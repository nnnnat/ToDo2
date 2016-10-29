import App from './_app';
let ready = false; // This is needed to prevent onreadystatechange being run twice

document.onreadystatechange = function () {
  if (ready) {
    return;
  }
  // interactive = DOMContentLoaded & complete = window.load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ready = true;
    console.log(ready);
    let app = new App();
    app.init();
  }
};
