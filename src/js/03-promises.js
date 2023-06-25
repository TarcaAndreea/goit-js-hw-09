import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stepInput = form.querySelector('input[name="step"]');
const amountInput = form.querySelector('input[name="amount"]');
const isSuccess = true;
form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const firstDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  let position = 0;
  if (amount <= 0 || firstDelay < 0 || step < 0) {
    Notiflix.Notify.failure(`Please input correct values (>=0)`);
    return;
  }
  let currentDelay = firstDelay;
  for (let i = 0; i < amount; i++) {
    position = i + 1;
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currentDelay += step;
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
