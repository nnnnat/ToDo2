import App from './_app';

let ready = false;
document.onreadystatechange = () => {
  if (ready) {
    return;
  }
  // interactive = DOMContentLoaded & complete = window.load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ready = true;

    window.app = new App();
  }
};
