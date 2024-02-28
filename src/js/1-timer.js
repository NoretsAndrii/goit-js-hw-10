import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    const data = new Date(selectedDates[0]);
    if (data.getTime() <= Date.now()) {
      btn.setAttribute('disabled', 'true');
      btn.classList.remove('active-btn');

      return iziToast.error({
        backgroundColor: 'red',
        close: false,
        messageColor: 'white',
        message: 'Please choose a date in the future',
        position: 'topRight',
        progressBar: false,
      });
    }
    userSelectedDate = data.getTime();
    btn.removeAttribute('disabled');
    btn.classList.add('active-btn');
  },
};

flatpickr('#datetime-picker', options);

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

btn.addEventListener('click', handleClick);

function handleClick(event) {
  btn.setAttribute('disabled', 'true');
  btn.classList.remove('active-btn');
  input.setAttribute('disabled', 'true');
  input.classList.add('disabled-input');

  let timer = setInterval(() => {
    let remainderMs = userSelectedDate - Date.now();

    if (remainderMs <= 0) {
      clearInterval(timer);
      btn.removeAttribute('disabled');
      btn.classList.add('active-btn');
      input.removeAttribute('disabled');
      input.classList.remove('disabled-input');
    } else {
      const obj = convertMs(remainderMs);
      makeTimerContent(obj);
    }
  }, 1000);
}

function addZero(value) {
  return `${value}`.padStart(2, '0');
}

function makeTimerContent({ days, hours, minutes, seconds }) {
  daysTimer.textContent = addZero(days);
  hoursTimer.textContent = addZero(hours);
  minutesTimer.textContent = addZero(minutes);
  secondsTimer.textContent = addZero(seconds);
}
