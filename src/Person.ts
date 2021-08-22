interface IPerson {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
}

export abstract class Person implements IPerson {
    id
    name
    phoneNumber
    email

    constructor(id:string, name:string, phoneNumber:string, email:string){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    getName():string{
        return this.name;
    }

    getEmail():string{
        return this.email;
    }
}