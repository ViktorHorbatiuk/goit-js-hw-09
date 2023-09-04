import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const links = {
  inputOfDateTimePicker: document.querySelector('#datetime-picker'),
  btnDataStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  container: document.querySelector('.timer'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      links.btnDataStart.disabled = true;
    } else {
      links.btnDataStart.disabled = false;
    }
  },
};

flatpickr(links.inputOfDateTimePicker, options);
links.btnDataStart.addEventListener('click', timerStartOn);


function timerStartOn() {
  setInterval(() => {
    let countdownTimer =
      new Date(links.inputOfDateTimePicker.value) - new Date();

    if (countdownTimer > 0) {
      links.btnDataStart.disabled = true;
      let time = convertMs(countdownTimer);
      links.dataDays.textContent = addLeadingZero(time.days);
      links.dataHours.textContent = addLeadingZero(time.hours);
      links.dataMinutes.textContent = addLeadingZero(time.minutes);
      links.dataSeconds.textContent = addLeadingZero(time.seconds);
      links.container.classList.add('timer-js');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
