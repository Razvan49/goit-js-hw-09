// IMPORTUL MODULULUI NOTIFY DIN NOTIFLIX
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// SELECTAREA FORMULARULUI DIN HTML
const form = document.querySelector('form');

// FUNCȚIE CARE CREEAZĂ PROMISE
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// FUNCȚIE CARE EXECUTĂ PROMISE-URILE
function executePromise(e) {
  e.preventDefault();
  let currentDelay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += step;
  }
}

// ADAUGĂ UN EVENIMENT "SUBMIT" PE FORMULAR
form.addEventListener('submit', executePromise);
