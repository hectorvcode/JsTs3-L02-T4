import {Person} from "./Person";


export class Student extends Person {

    constructor(id:string, name:string, phoneNumber:string, email:string){
        super(id, name, phoneNumber, email);
    }
}