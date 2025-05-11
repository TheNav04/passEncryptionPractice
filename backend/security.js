import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

// FIXME: Server needs to generate both public and private key

// Public key
// Sending data in this form causes corruption
const key = crypto.randomBytes(32); // Secure key storage in production
const iv = crypto.randomBytes(16);  //Initialization Vector,  prevents same text from generating same cipher


// Private Key
let keyPrivate;
let ivPrivate;

// sending as raw binary could break JSON.stringify
// need to encode, add a layer of abstraction to send
export const encodedPublicKey = Buffer.from(key).toString('base64');
export const encodedPublicIV = Buffer.from(iv).toString('base64');


// WTF is this syntax
// export const hexFormatKey = [...key].map(b => b.toString(16).padStart(2, '0')).join('');
// export const hexFormatIV = [...iv].map(b => b.toString(16).padStart(2, '0')).join('');




// export const hexFormatPrivateKey = [...keyPrivate].map(b => b.toString(16).padStart(2, '0')).join('');
// export const hexFormatPrivateIV = [...ivPrivate].map(b => b.toString(16).padStart(2, '0')).join('');


//Can make this async and return a promise
//because crytpo functions are heavy and block the event queue (main thread).
export async function encrypt(text){
    return new Promise((resolve, reject) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encryptData = cipher.update(text,'utf8', 'hex') //we have a text, it is in 'utf8' format, we make cipher in 'hex' format
        encryptData += cipher.final('hex')
        console.log(encryptData);
        resolve(encryptData);
    })
}

export async function decrypt(text){
    return new Promise((resolve, reject) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decryptData = decipher.update(text, 'hex', 'utf8');
        decryptData += decipher.final('utf8')
        console.log(encryptData);
        resolve(decryptData);
    });
}
