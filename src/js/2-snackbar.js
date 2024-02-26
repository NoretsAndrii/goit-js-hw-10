import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', hendlerSubmit);

function hendlerSubmit(event) {
  event.preventDefault();
  const eventForm = event.target;
  const radioValue = eventForm.elements.state.value;
  const delay = eventForm.elements.delay.value;
  eventForm.reset();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay =>
      iziToast.show({
        close: false,
        backgroundColor: 'lightgreen',
        messageColor: 'white',
        message: ` ✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        progressBar: false,
      })
    )
    .catch(delay =>
      iziToast.show({
        close: false,
        backgroundColor: 'red',
        messageColor: 'white',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        progressBar: false,
      })
    );
}
