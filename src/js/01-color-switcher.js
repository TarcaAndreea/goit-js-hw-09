'use strict';
// 1.Scrie un script care, după apăsarea butonului «Start», o dată pe secundă schimbă culoarea de fundal a lui <body> la o valoare aleatorie folosind stilul inline. La click-ul butonului «Stop», schimbarea culorii de fundal se va opri.
//Butonul «Start» poate fi apăsat de un număr infinit de ori. Fă astfel încât, în timp ce schimbarea culorii de fundal este activată, butonul «Start» să fie dezactivat (disabled).
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', eventStart);
buttonStop.addEventListener('click', eventStop);

function eventStart() {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomColor;
  }, 1000);

  buttonStart.disabled = true;
}

function eventStop() {
  clearInterval(timerId);
  buttonStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
