import { Component, OnInit, OnDestroy } from '@angular/core';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
@Component({
  selector: 'app-contact-information-page',
  templateUrl: './contact-information-page.component.html',
  styleUrls: ['./contact-information-page.component.scss'],
})
export class ContactInformationPageComponent implements OnInit, OnDestroy {
  public isUpdating: boolean = false;
  public contactData: any[] = [];
  constructor(
    private breadcrumbsService: BreadcrumbService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'CMS',
      page: 'Manage Contact Info',
    });

    this.getContactsData();
  }

  ngOnDestroy(): void {}

  getContactsData(): void {
    const localStorageData = localStorage.getItem('contactData');

    if (localStorageData) {
      this.contactData = JSON.parse(localStorageData);
      console.log(this.contactData);
    } else {
      this.firebaseService.getCmsContactData().subscribe((res) => {
        this.contactData = Helper.toArrayObjects(res);
        localStorage.setItem('contactData', JSON.stringify(this.contactData));
        console.log(this.contactData);
      });
    }
  }

  onClickUpdate(): void {
    this.isUpdating = this.isUpdating ? false : true;
  }
}
