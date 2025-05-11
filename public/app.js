import {registerAccount, loginAccount, getPublicKey} from './api.js';

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


// Send private key data using this
const publicKeyInfo = await getPublicKey();


//1. Generate private key
//Crypto is global object like document
const privateKey = window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true, // extractable: allows exporting
  ["encrypt", "decrypt"]
);  // do ctrl + m1 on encrypt to see details // Shit ton of interfaces and classes in their // All apart of browser environment



//2. Encode private key and private iv
const encodedMessage = new TextEncoder().encode('Hello, world!');
const ciphertext = await crypto.subtle.encrypt(
    {
        'name': 'AES-GCM',
        'iv': publicKeyInfo.iv, // your Uint8Array IV
    },
    publicKeyInfo.publicKey,      // your imported key
    encodedMessage  // your plaintext
);



//3. Sent to server









