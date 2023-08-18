const objectDate = new Date();
let day = objectDate.getDate();
let month = objectDate.getMonth() + 1;
let year = objectDate.getFullYear();
if (day < 10) {
  day = '01';
}

if (month < 10) {
  month = `0${month}`;
}

let format = `${year}${month}${day}`;
console.log(objectDate);
console.log(format);