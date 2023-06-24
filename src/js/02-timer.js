import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//Scrie un script pentru un timer care numără invers până la o anumită dată. Un astfel de cronometru poate fi folosit în bloguri și magazine online, pagini de înregistrare pentru un eveniment, în timpul mentenanței unui produs etc. Urmărește un videoclip demonstrativ al cronometrului.
const inputData = document.getElementById('datetime-picker');
const buttonStart = document.querySelector('button[ data-start]');
const timer = document.querySelector('.timer');
const field = document.querySelector('.field');
const valueDays = document.querySelector('.value[data-days]');
const valueHours = document.querySelector('.value[data-hours]');
const valueMinutes = document.querySelector('.value[data-minutes]');
const valueSeconds = document.querySelector('.value[data-seconds]');
let timerId = null;
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
  },
};

flatpickr(inputData, options);

const addLeadingZero = value => String(value).padStart(2, '0');

buttonStart.addEventListener('click', eventStart);

function eventStart() {
  const selectedDate = flatpickr.parseDate(inputData.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  let timeRemaining = selectedDate.getTime() - currentDate.getTime();

  updateCountdownDisplay(timeRemaining);

  timerId = setInterval(() => {
    if (timeRemaining > 1000) {
      timeRemaining -= 1000;
      updateCountdownDisplay(timeRemaining);
    } else {
      clearInterval(timerId);
      updateCountdownDisplay(0);
      Notiflix.Notify.success('Countdown finished!');
    }
  }, 1000);
}
function updateCountdownDisplay(timeRemaining) {
  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  valueDays.textContent = addLeadingZero(days);
  valueHours.textContent = addLeadingZero(hours);
  valueMinutes.textContent = addLeadingZero(minutes);
  valueSeconds.textContent = addLeadingZero(seconds);
}
