import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  contactData: any[] = [];

  public isMobileView:boolean =false
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // this.addContactDataMock();

    this.isMobileView = window.innerWidth < 767
    this.getContactsData();
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

  addContactDataMock() {
    const data = {
      address: 'Pablo Borbon, Batangas State University',
      contact: '09362173627',
      email: 'telemedicine@yahoo.com',
    };

    this.firebaseService
      .updateCmsContactData('-NPfScA4r5sR1HSAuRJm', data)
      .then((res) => {
        console.log(res, 'success');
      });
  }

  @HostListener('window: resize',['$event.target'])
  public onResize(eventTarget: EventTarget):void{

    if((<Window>eventTarget).innerWidth < 767){
      if(!this.isMobileView){
        this.isMobileView = true
      }
    }
    if((<Window>eventTarget).innerWidth >= 767){
      if(this.isMobileView){
        this.isMobileView = false
      }
    }
  }
}
