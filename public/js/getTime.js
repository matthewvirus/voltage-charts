const startTimeInput = document.getElementById('start');
const endTimeInput = document.getElementById('end');

var now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

startTimeInput.value = now.toISOString().slice(0,19);
endTimeInput.value = now.toISOString().slice(0,19);