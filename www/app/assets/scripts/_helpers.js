export function getTodos(type = 'upcoming', callback) {
  fetch(`?action=${type}`)
    .then(response => response.json())
    .then(todos => callback(todos));
}

export function updateTodo(type, fields, callback) {
  fetch(`?action=${type}${fields}`)
    .then(response => response.json())
    .then(todo => callback(todo));
}

export function dbDate(date) {
  const realDate = new Date(date);
  const year = realDate.getFullYear();
  let dd = realDate.getDate();
  let mm = realDate.getMonth();


  return `${mm}/${dd}/${year}`;
}

export function viewDate(date) {
  return date;
}

export function emptyText(text) {
  return (text == '');
}
