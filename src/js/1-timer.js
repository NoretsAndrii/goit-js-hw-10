import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const daysTimer = document.querySelector('[data-days]');
const secondTimer = document.querySelector('[data-seconds]');

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
      return alert('Please choose a date in the future');
    }
    userSelectedDate = data.getTime();
    btn.removeAttribute('disabled');
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
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

btn.addEventListener('click', handleClick);
function handleClick(event) {
  btn.setAttribute('disabled', 'true');
  input.setAttribute('disabled', 'true');

  let remainderMs = userSelectedDate - Date.now();

  let timerId = setInterval(
    () => {
      // debugger;
      if (remainderMs <= 0) {
        clearInterval(timerId);
        btn.removeAttribute('disabled');
        input.removeAttribute('disabled');
      } else {
        const obj = convertMs(remainderMs);
        makeTimerContent(obj);
        remainderMs -= 1000;
        console.log(remainderMs);
      }
    },
    1000,
    remainderMs
  );
}

function addZero(value) {
  return `${value}`.padStart(2, '0');
}

function makeTimerContent({ days, hours, minutes, seconds }) {
  secondTimer.textContent = addZero(seconds);
}
