//import { requestData, getData } from './_helpers';

import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';

import App from './_new-app';

let ready = false; // This is needed to prevent onreadystatechange being run twice

document.onreadystatechange = () => {
  if (ready) {
    return;
  }
  // interactive = DOMContentLoaded & complete = window.load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    ready = true;

    fetch('?action=all')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data => {
      window.app = new App(data);
    });
  }
};
