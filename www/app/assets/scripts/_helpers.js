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

// export function emptyText(text) {
//   return (text == '');
// }

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
