import axios from 'axios';

export default () => {
  const containerForm = document.querySelector('.form-container');
  containerForm.innerHTML = `<form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
    </form>`;
  const state = {
    registrationForm: {
      name: {
        value: null,
        valid: null,
      },
      email: {
        value: null,
        valid: null,
      },
    },
  };
  // const inputs = document.querySelectorAll('input');
  const inpName = document.querySelector('#inputName');
  const inpEmail = document.querySelector('#inputEmail');
  const button = document.querySelector('.btn');
  const form = document.querySelector('#registrationForm');
  button.setAttribute('disabled', true);
  inpName.addEventListener('input', (e) => {
    const { value } = e.target;
    const isValid = /^\w+\s*$/.test(value);
    state.registrationForm.name.value = value;
    state.registrationForm.name.valid = isValid;
    inpName.classList.remove('is-valid', 'is-invalid');
    // eslint-disable-next-line
    isValid === true ? inpName.classList.add('is-valid') : inpName.classList.add('is-invalid');
    button.disabled = !(state.registrationForm.name.valid
            && state.registrationForm.email.valid);
  });
  inpEmail.addEventListener('input', (e) => {
    const { value } = e.target;
    const isValid = /^\w+@[a-zA-Z]+(\.[a-z]+)?$/.test(value);
    state.registrationForm.email.value = value;
    state.registrationForm.email.valid = isValid;
    inpEmail.classList.remove('is-valid', 'is-invalid');
    // eslint-disable-next-line
    isValid === true ? inpEmail.classList.add('is-valid') : inpEmail.classList.add('is-invalid');
    button.disabled = !(state.registrationForm.name.valid
            && state.registrationForm.email.valid);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    /*const formData = new FormData(e.target);
    const inputName = formData.get('name');
    const inputEmail = formData.get('email');
    const userData = {
      name: inputName,
      email: inputEmail,
    }; */
    const userData = {
        name: state.registrationForm.name.value,
        email: state.registrationForm.email.value
    }
    axios.post('/users', userData)
        .then((response) => {
            document.body.innerHTML = `<p>${response.data.message}</p>`;
        })
        .catch((error) => {
            console.log(error);
        });
  });
};
