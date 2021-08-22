
import { Menu } from './Menu'
import {Mentor} from "./Mentor";
import {Student} from "./Student";
import {Conference} from "./Conference";

let mentorList: Mentor[] = [];
let studentList: Student[] = [];
let conferenceList: Conference[] = [];

function mentorValidation<T extends string>(mentorList:Mentor[], email:T, password:T) {
  return mentorList.find(m => m.getEmail() === email && m.getPassword() === password)
}

(async () => {
  const menu = new Menu()
    while (menu.isActive()) {

      menu.printMenu()
      let key = await menu.getInt('seleccione un número de la lista:')
    
      switch (key) {
        case 0:
          console.log('0: ',key);
          menu.close()
          process.exit()

          break;
        
        case 1: /** Add Mentor by input */

          const inputMentorId = await menu.getString('Ingrese su numero de documento');
          const inputMentorName = await menu.getString('Ingrese su nombre completo');
          const inputPhoneNumber = await menu.getString('Ingrese su numero de teléfono');
          const inputMentorEmail = await menu.getString('Ingrese su correo electrónico');
          const inputPassword = await menu.getString('Ingrese su contraseña');

          /** Validate unique email */

          let uniqueMentorEmail = mentorList.some(email => email.getEmail() === inputMentorEmail)
          if(uniqueMentorEmail){
            console.log('El correo ya fue usado para el registro');
          } else {
            mentorList.push(new Mentor(inputMentorId, inputMentorName, inputPhoneNumber, inputMentorEmail, inputPassword));
            console.log('Registro exitoso')
          }
          break;
        
        case 2: /** Add Student by input */
          const inputStudentId = await menu.getString('Ingrese su numero de documento');
          const inputStudentName = await menu.getString('Ingrese su nombre completo');
          const inputStudentNumber = await menu.getString('Ingrese su numero de teléfono');
          const inputStudentEmail = await menu.getString('Ingrese su correo electrónico');

          /** Validate unique email */

          let studentEmailVal = studentList.some(email => email.getEmail() === inputStudentEmail);
          if(studentEmailVal){
            console.log('El correo ya fue usado para el registro')
          }  else {
            studentList.push(new Student(inputStudentId, inputStudentName, inputStudentNumber, inputStudentEmail));
            console.log('Registro exitoso')
          }
          break;
        
        case 3: /** Add Conference by input */

          const mentorEmailInput = await menu.getString('Mentor, digite su correo');
          const mentorPasswordInput = await menu.getString('Digite la contraseña')
          let validateMentor: Mentor | undefined = mentorValidation(mentorList, mentorEmailInput, mentorPasswordInput);
          if(validateMentor === undefined){
            console.log('Intente nuevamente, datos inválidos')
          } else {
            const conferenceName = await menu.getString('Digite nombre de la conferencia');
            const maxCap = 20;
            const startDate = await menu.getString('Digite la fecha de inicio de la conferencia con formato dd-mm-aaaa');
            const endDate = await menu.getString('Digite la fecha de finalización de la conferencia con formato dd-mm-aaaa');

            let emailValidation:Mentor[] = mentorList.filter(email => email.getEmail() === mentorEmailInput);
            let mentorConferences: Conference[] = conferenceList.filter(mentor => mentor.getMentor().getEmail() === mentorEmailInput);

            let dateValidation: boolean;
            if(emailValidation.length != 0){
              let dateRegister: boolean[] = [];
              for(let i = 0; i < mentorConferences.length; i++){
                let startDate1: string = mentorConferences[i].startDate.split('-')[0];
                let endDate1: string = mentorConferences[i].endDate.split('-')[0];
                let startDate2: string = startDate.split('-')[0];
                let endDate2: string = startDate.split('-')[0];

                dateValidation =  (startDate1 != startDate2) && (endDate1 != endDate2) && (endDate1 != startDate2);
                dateRegister.push(dateValidation);
              }

              if(dateRegister.some(e => !e)){
                console.log('El mentor ya tiene evento agendado para la fecha indicada')
              } else {
                conferenceList.push(new Conference(conferenceName, maxCap, startDate, endDate, validateMentor))
                console.log('Conferencia registrada con exito')
              }
            }
          }
          break;
      
        case 4: /** Check Conference List */

          console.log('Lista de conferencias');
          console.log(conferenceList.map( (e) => (e.conferenceName) ));
          break;
      
        case 5: /** Conference list by mentor */

          const inputMentorName2: string = await menu.getString('Escriba el nombre del mentor');
          const findMentor: Mentor | undefined = mentorList.find(e => e.getName() === inputMentorName2);
          if(findMentor === undefined){
            console.log('El mentor no se encuentra registrado');
          } else {
            let conferenceByMentor: Conference[] = conferenceList.filter(e => e.getMentor().getName() === inputMentorName2);
            console.log(conferenceByMentor.map(e => e.conferenceName));
          }
          break;
      
        case 6: /** Register to a Conference */

          const registerEmail: string = await menu.getString('Digite su correo electrónico');
          const validateEmailStudent: Student | undefined = studentList.find( e => e.getEmail() === registerEmail );
          if(validateEmailStudent === undefined){
            console.log('El email no se encuentra en nuestra base de datos');
          } else {
            const inputConference: string = await menu.getString('Ingrese el nombre de la conferencia');
            const conferenceValidation: Conference | undefined = conferenceList.find(e => e.conferenceName === inputConference);

            if(conferenceValidation === undefined){
              console.log('La conferencia no se encuentra en nuestra base de datos');
            } else {
              if(conferenceValidation.getStudents().length === 20){
                console.log('No hay cupos disponibles');
              } else {
                const conferenceConfirmation: Conference | undefined = conferenceList.find(e => e.conferenceName === inputConference);
                if(conferenceConfirmation === undefined){
                  console.log('La conferencia no se encuentra en nuestra base de datos');
                } else {
                  const uniqueEmailValidation = conferenceConfirmation.getStudents().some(e => e.getEmail() === registerEmail);
                  if(uniqueEmailValidation){
                    console.log('El estudiante ya se encuentra registrado');
                  } else {
                    conferenceConfirmation.addStudent(validateEmailStudent);
                    console.log('Registro exitoso')
                  }
                }
              }
            }
          }
          break;
        
        case 7: /** Students List */
          console.log('Lista de estudiantes');
          console.log(studentList.map((student) => student.name));
          break;

        case 8: /** Mentor List */
          console.log('Lista de mentores');
          console.log(mentorList.map((mentor) => mentor.name));
          break;

        case 9: /** Student List by Conference */
          const inputConferenceName: string = await menu.getString('Digite el nombre de la conferencia');
          const valConference: Conference | undefined = conferenceList.find(conference => conference.conferenceName === inputConferenceName);
          if(valConference === undefined){
            console.log('La conferencia ingresada no se encuentra en nuestra base de datos');
          } else {
            console.log(valConference.getStudents());
          }
          break;

          default:
          console.log('Debe elegir una opción valida');
          //menu.close()
          break;
      }
    }
    
  console.log('Adios');
    
  })()


