import {Debug} from './extra.js'

export function registerAccount(event, username, pass) {
    event.preventDefault();     
    Debug.log('registerAccount() is called');

    if(username == "" || pass == ""){
        Debug.log('Form not completed correctly!');
    }
    else {
        //POST data to server
        SendNewRegister(username, pass);
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