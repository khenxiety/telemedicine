import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  contactData: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.addContactDataMock();

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
        console.log(this.contactData);
      });
    }
  }

  addContactDataMock() {
    const data = {
      address: 'Batangas State Universities',
      contact: '09362173627',
      email: 'telemedicine@yahoo.com',
    };

    this.firebaseService
      .updateCmsContactData('-NPfScA4r5sR1HSAuRJm', data)
      .then((res) => {
        console.log(res, 'success');
      });
  }
}
