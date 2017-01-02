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
  const dd = realDate.getDate();
  const mm = realDate.getMonth();

  return `${mm}/${dd}/${year}`;
}

export function viewDate(date) {
  return date;
}

export function dateCompair(date1, date2 = new Date()) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0,0,0,0);
  d2.setHours(0,0,0,0);
  return (d1 < d2) ? true : false;
}

export function colorDarken(col, amt) {
  const f=col.split(","),
  t=amt<0?0:255,
  p=amt<0?amt*-1:amt,
  R=parseInt(f[0].slice(4)),
  G=parseInt(f[1]),
  B=parseInt(f[2]);
  return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

export function pickColor() {
  const colors = ['rgb(0,117,217)','rgb(0,137,87)','rgb(220, 0, 173)','rgb(177, 13, 201)'];
  return colors[Math.floor(Math.random() * colors.length)];
}
