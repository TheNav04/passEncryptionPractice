import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Secure key storage in production
const iv = crypto.randomBytes(16);  //Initialization Vector,  prevents same text from generating same cipher


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
