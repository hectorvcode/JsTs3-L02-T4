import {Person} from "./Person";


export class Mentor extends Person {

    protected password: string;
    constructor(id:string, name:string, phoneNumber:string, email:string, password:string){
        super(id, name, phoneNumber, email);
        this.password = password;
    }

    getPassword():string{
        return this.password;
    }
}