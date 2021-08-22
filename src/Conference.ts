import {Student} from "./Student";
import {Mentor} from "./Mentor";


export class Conference {

    public conferenceName: string;
    public capacity: number;
    public startDate: string;
    public endDate: string;
    protected mentor: Mentor;
    protected students: Student[];

    constructor(conferenceName:string, capacity:number, startDate:string, endDate:string, mentor:Mentor){
        this.conferenceName = conferenceName;
        this.capacity = 20;
        this.startDate = startDate;
        this.endDate = endDate;
        this.mentor = mentor;
        this.students = [];
    }

    getMentor(): Mentor{
        return this.mentor;
    }

    getStudents(): Student[] {
        return this.students
    }

    addStudent(student: Student):boolean {
        if(this.students.length <= this.capacity){
            this.students.push(student);
            return true;
        } else {
            return false;
        }
    }
}