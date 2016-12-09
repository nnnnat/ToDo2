import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';

export function requestData(action, callback) {
  let request = new XMLHttpRequest();

  request.onload = (e) => {
    let data = JSON.parse(request.response);
    callback(data);
  };
  request.open('GET', '?action='+action, true);
  request.send();
  // request.onerror = (e) => {
  //   console.log('connection error');
  // };
}

export function returnData(data) {
  // console.log('hey');
  // console.log(data);
  return data;
}

export function getData() {
  fetch('?action=upcoming')
  .then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  })
  .then(function(stories) {
      console.log(stories);
  });
}
