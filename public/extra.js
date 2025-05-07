export class Debug {
    static status = true;

    static log(statement){
        if(Boolean(Debug.status) == true){
            console.log(statement);
        }
    }

    static disable(){
        Debug.status = false;
    }

    static enable(){
        Debug.status = true;
    }
}