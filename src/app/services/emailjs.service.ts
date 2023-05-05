import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus, init } from '@emailjs/browser';
import { environment } from 'src/environments/environment';
init('Vujdp2W2SPh44s_tj')
@Injectable({
  providedIn: 'root'
})
export class EmailjsService {

  constructor() { }


  async sendEmail(email:any):Promise<any>{
    try {
      const emailSend:EmailJSResponseStatus = await emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        email, 
        'Vujdp2W2SPh44s_tj')

      return emailSend
      
    } catch (error) {
      console.error(error)
      return error
    }finally{}


    
  }

  async sendEmailAccountApproval(email:any):Promise<any>{
    try {
      const emailSend:EmailJSResponseStatus = await emailjs.send(
        environment.emailJs.serviceId,
        'template_zk1l41c',
        email, 
        'Vujdp2W2SPh44s_tj')

      return emailSend
      
    } catch (error) {
      console.error(error)
      return error
    }finally{}


    
  }
}
