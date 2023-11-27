// Importa el modelo de usuario
//const User = require('../models/user');

const formulario = document.querySelector('#formulario');
const showPassword = document.querySelector('#show-password-checkbox');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formBtn = document.querySelector('#form-btn');
const msjError = document.querySelector('#mensajeError');

emailInput.addEventListener('input', () => {
    toggleButton();
});
  
passwordInput.addEventListener('input', () => {
    toggleButton();
});

function toggleButton() {
    if (emailInput.value && passwordInput.value) {
      formBtn.disabled = false;
    } else {
      formBtn.disabled = true;
    }
}

showPassword.addEventListener('click', () => {
    if (showPassword.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

formBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    msjError.textContent = ''; // Restablece el mensaje de error previo

    setTimeout(() => {
        formBtn.disabled = false;
        emailInput.value = '';
        passwordInput.value = '';
    }, 4000);

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            window.location.href = '/planillas/';
        } else {
            msjError.textContent = 'Usuario no registrado';
        }
    } catch (error) {
        console.log('Error al realizar la solicitud:', error);
        msjError.textContent = 'Usuario no encontrado';
    }
});

