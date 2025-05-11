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


export async function getPublicKey(){
    try {
        const publicKey = await fetch('/getPublicKey');
        const confirmation = await publicKey.json();

        Debug.log('encoded public key')
        Debug.log(confirmation['key']);
        Debug.log(confirmation.iv);

        const key = Uint8Array.from(atob(confirmation.key), c => c.charCodeAt(0));
        const iv = Uint8Array.from(atob(confirmation['iv']), c => c.charCodeAt(0));

        Debug.log('decoded public key');
        Debug.log(key);
        Debug.log(iv);

        const cryptoKey = await crypto.subtle.importKey(
            'raw',         // raw format of the key
            key,           // the Uint8Array key you received
            'AES-GCM',     // algorithm
            false,         // not extractable
            ['encrypt']    // usage
        );

        Debug.log('cryptoKey is: ' + typeof cryptoKey);
        Debug.log(cryptoKey);

        return {
            'publicKey': cryptoKey,
            'iv': iv,
        };
        
    }
    catch (error) {
        console.error('There was an error:', error);
    }
}