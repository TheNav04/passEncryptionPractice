import express from 'express';
import fs from 'fs';
import path from 'path';
import http from 'http';

import bcrypt from 'bcryptjs';
import {encrypt, decrypt, encodedPublicKey, encodedPublicIV} from './security.js';


const app = express();
console.log('path: ' + path.resolve('../public'));

let dataArr = [];   // this is data in memory ONLY, once application is turned off this will too

console.log('key: ' + encodedPublicKey);
console.log('iv: ' + encodedPublicIV);


// MIDDLEWARE
// Serving html, css, js from public
app.use(express.static(path.resolve('../public')));
// Parsing JSON requests
app.use(express.json());


// API ROUTES
// HIDES THE MESSY ROUTING
app.get('/', (req, res) => {
    res.sendFile(path.resolve('../public/main.html'));

});

app.get('/getPublicKey', (req, res) => {
    // OR use res.send(JSON.stringify{...})
    res.json({
        'key': encodedPublicKey,
        'iv': encodedPublicIV
    });    
});

app.post('/loginUser', async (req, res) => {
    try {
        const {username, pass} = req.body;
        
        for(let i = 0; i < dataArr.length; i++){
            let currAccount = dataArr[i];

            if(currAccount['username'] == username){
                console.log(currAccount + ' is in the database!');
                const match = await bcrypt.compare(pass, currAccount['pass']);

                if(match == true){
                    res.send(await encrypt('login succesful'));
                    return;
                }
            }    
        }
        res.send(await encrypt('login failed'));
        
    }
    catch (error){
        console.error('some error:', error);
    }
});

//What other ways are their to send data to server other then JSON
app.post('/registerUser', async (req, res) => {
    try {
        const clientData = req.body;
        const username = clientData.username;
        const pass = clientData.pass;

        // Use async bcrypt functions
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);

        const temp = { username, pass: hash };
        dataArr.push(temp);

        res.send("Account Registered Successfully!");
        console.log(dataArr[dataArr.length - 1]);

        // Compare using bcrypt.compare (async-safe)
        const match = await bcrypt.compare(pass, hash);
        if (match) {
            console.log('pass matches hash in test!');
        }

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send("Server error");
    }
});

app.listen(3000, () => {
    console.log('server up at: http://localhost:3000');
});