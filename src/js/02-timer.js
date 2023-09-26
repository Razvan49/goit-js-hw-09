// IMPORTAREA BIBLIOTECILOR ȘI MODULULUI NOTIFLIX

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const uiInput = {
  timePicker: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  theme: 'material_green',
  onClose(selectedDates) {
    const selectedTime = selectedDates[0];
    const startTime = Date.now();

    // LOGICĂ PENTRU NOTIFICAREA DE DATĂ DIN TRECUT UTILIZÂND NOTIFLIX
    if (selectedTime < startTime) {
      Notify.failure('Please choose a date in the future.');
      uiInput.startBtn.disabled = true;
    }

    uiInput.startBtn.disabled = false;

    let intervalId = null;

    // ADAUGĂ UN EVENIMENT "CLICK" PE BUTONUL DE PORNIRE
    uiInput.startBtn.addEventListener('click', startCountdown);

    // FUNCȚIE PENTRU PORNIREA CRONOMETRULUI
    function startCountdown() {
      uiInput.startBtn.disabled = true;
      uiInput.timePicker.disabled = true;

      intervalId = setInterval(() => {
        const currentTime = Date.now();

        // VERIFICĂ DACA DATA SELECTATĂ ESTE ÎN TRECUT
        if (selectedTime < currentTime) {
          clearInterval(intervalId);
          uiInput.timePicker.disabled = false;
        }

        // CALCULUL DIFERENȚEI DE TIMP ÎN MILISECUNDE ȘI CONVERTIREA ÎN ZILE, ORE, MINUTE ȘI SECUNDE
        const timeDifference = selectedTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        // AFISAREA ZILELOR, ORELOR, MINUTELOR ȘI SECUNDELOR PE INTERFAȚĂ
        uiInput.days.textContent = addLeadingZero(days);
        uiInput.hours.textContent = addLeadingZero(hours);
        uiInput.minutes.textContent = addLeadingZero(minutes);
        uiInput.seconds.textContent = addLeadingZero(seconds);
      }, 1000);
    }
  },
};

// FUNCȚIE PENTRU ADAUGAREA DE "0" LA STÂNGA UNUI NUMĂR (UTIL PENTRU FORMATARE)
function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}

// FUNCȚIE PENTRU CONVERTIREA TIMPULUI DIN MILISECUNDE ÎN ZILE, ORE, MINUTE ȘI SECUNDE
function convertMs(ms) {
  // Numărul de milisecunde per unitate de timp
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Calcularea zilelor rămase
  const days = Math.floor(ms / day);
  // Calcularea orelor rămase
  const hours = Math.floor((ms % day) / hour);
  // Calcularea minutelor rămase
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Calcularea secundelor rămase
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// CREAȚI UN DATEPICKER FLATPICKR CU OPȚIUNILE SPECIFICATE
flatpickr(uiInput.timePicker, options);
