import {Debug} from './extra.js'

export function registerAccount(event, username, pass) {
    event.preventDefault();     
    Debug.log('registerAccount() is called');

    if(username == "" || pass == ""){
        Debug.log('Register Form not completed correctly!');
    }
    else {
        //POST data to server
        SendNewRegister(username, pass);
    }

}

export function loginAccount(event, username, pass){
    event.preventDefault();     
    Debug.log('loginAccount() is called');
    if(username == "" || pass == ""){
        Debug.log('Login Form not completed correctly!');
    }   
    else{
        GetLoginData(username, pass);
    }

}

async function GetLoginData(username, pass) {
    try {
        Debug.log('client side: ' + username);
        Debug.log('client side: ' + pass);

        const verifyAccount = await fetch('/loginUser', {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json'
            },
            'body': JSON.stringify({
                'username': username,
                'pass': pass
            })
        });

        const response = await verifyAccount.text();
        console.log(response);
    }
    catch(error) {
        console.error('Some error occured: ' + error);
    }
}


async function SendNewRegister(username, pass){
    //enter API


    try{
        Debug.log(username);
        Debug.log(pass);
        
        const posting = await fetch("/registerUser", {
        //JSON
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username, 
            'pass': pass    
            })      
        });  

        const confirmation = await posting.text();  //OR if server sending JSON -> posting.json();
        console.log(confirmation);       
    }
    catch (error) {
        console.error("Some error happened: ", error);
    }
}