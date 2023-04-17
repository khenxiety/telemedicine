import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Helper } from 'src/app/helpers/helper.helper';
import { EmailjsService } from 'src/app/services/emailjs.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() marginTop:boolean = false
  @Input() isHeaderTextOn:boolean = false

  public isLoading:boolean = false
  contactData: any[] = [];

  public emailFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  constructor(private message: NzMessageService,
    private emailService:EmailjsService,
    private firebaseService: FirebaseService,) { }

  ngOnInit(): void {
    this.getContactsData()
  }

  getContactsData(): void {
    const localStorageData = localStorage.getItem('contactData');

    if (localStorageData) {
      this.contactData = JSON.parse(localStorageData);
    } else {
      this.firebaseService.getCmsContactData().subscribe((res) => {
        this.contactData = Helper.toArrayObjects(res);
        localStorage.setItem('contactData', JSON.stringify(this.contactData));
      });
    }
  }

  async sendEmail(){
    if(!this.emailFormGroup.valid){
      this.message.error('Please fill up all the fields');
      return
    }
    try {
      this.isLoading = true;
      const { email, name, subject, message} = this.emailFormGroup.controls
      const data = {
        subject: subject.value,
        message:message.value,
        from_name:name.value,
        email:email.value
      }
      const emailResponse = await this.emailService.sendEmail(data)
      if(emailResponse.status == 200){
        this.message.success('Email has been sent');
        this.emailFormGroup.reset()
      }
    } catch (error) {
      console.error(error)
    }finally{
      this.isLoading = false;
    }
  }

}
