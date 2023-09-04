const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let setTimer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStart.addEventListener('click', randomColorStart);
btnStop.addEventListener('click', randomColorStop);

function randomColorStart() {
    setTimer = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    btnStart.disabled = true;
    btnStop.disabled = false;
};

function randomColorStop(params) {
    setTimer = clearInterval(setTimer);
    btnStart.disabled = false;
    btnStop.disabled = true;
};
