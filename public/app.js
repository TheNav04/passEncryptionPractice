import {registerAccount, loginAccount} from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerForm').addEventListener('submit', (event) => {
    event.preventDefault(); 

    registerAccount(event, document.getElementById('newUsername').value, document.getElementById('newPassword').value);
    
  });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
      event.preventDefault();
      loginAccount(event, document.getElementById('logUsername').value, document.getElementById('logPassword').value);

    });
  });
  













