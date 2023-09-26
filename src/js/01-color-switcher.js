// SELECTAREA BUTOANELOR "START" ȘI "STOP" DUPĂ ATRIBUTELE LOR "data-start" ȘI "data-stop"
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

// SELECTAREA ELEMENTULUI BODY (FUNDALUL PE CARE ÎL VOM MODIFICA)
const backgroundElem = document.querySelector('body');

// DECLARAREA VARIABILEI PENTRU STOCAREA ID-ULUI TIMERULUI
let timerId = null;

// FUNCȚIE CARE GENEREAZĂ O CULOARE HEX RANDOM
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// FUNCȚIE CARE DEZACTIVEAZA BUTONUL "START"
function disableBtn() {
  startBtn.disabled = true;
}

// FUNCȚIE CARE ACTIVEAZĂ BUTONUL "START"
function enableBtn() {
  startBtn.disabled = false;
}

// ADĂUGAREA UNUI EVENIMENT CLICK PE BUTONUL "START"
startBtn.addEventListener('click', () => {
  // CREARE A UNUI TIMER CARE VA SCHIMBA CULOAREA DE FUNDAL A BODY-ULUI LA INTERVAL DE 1 SECUNDĂ
  timerId = setInterval(() => {
    // GENERAREA UNEI CULORI HEX RANDOM ȘI SETAREA ACESTEI CULORI CA BACKGROUND
    const randomColor = getRandomHexColor();
    backgroundElem.style.backgroundColor = randomColor;
  }, 1000);

  // DAM DISABLE LA BUTONUL "START"
  disableBtn();
});

// ADĂUGAREA UNUI EVENIMENT CLICK PE BUTONUL "STOP"
stopBtn.addEventListener('click', () => {
  // ÎNCETAREA TIMERULUI, OPRIREA SCHIMBĂRII CULORII DE FUNDAL
  clearInterval(timerId);

  // ACTIVAREA BUTONULUI "START" PENTRU A PERMITE UTILIZATORULUI SĂ PORNEASCĂ DIN NOU SCHIMBAREA CULORII
  enableBtn();
});
