import {registerAccount} from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault(); 

    registerAccount(event, document.getElementById('newUsername').value, document.getElementById('newPassword').value);
    
  });

    document.getElementById('loginForm').addEventListener('click', () => {
      // Your login logic here
    });
  });
  













