import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  public contactFormGroup: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  public isLoading: boolean = false;
  constructor(
    private breadcrumbsService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'CMS',
      page: 'Manage Contact Info',
    });

    this.getContactsData();
    console.log(this.contactFormGroup);
  }

  ngOnDestroy(): void {}

  buildForm(data: any): void {
    this.contactFormGroup = new FormGroup({
      address: new FormControl(data[0].address || '', Validators.required),
      contact: new FormControl(data[0].contact || '', Validators.required),
      email: new FormControl(data[0].email || '', Validators.required),
    });
  }

  getContactsData(): void {
    const localStorageData = localStorage.getItem('contactData');

    if (localStorageData) {
      this.contactData = JSON.parse(localStorageData);
      console.log(this.contactData);
      this.buildForm(this.contactData);
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
    this.message.info(this.isUpdating ? 'Update mode' : 'View mode');
  }

  onClickConfirm(): void {
    this.isLoading = true;
    const data = {
      ...this.contactFormGroup.value,

      lastModified: new Date().toLocaleString(),
    };

    this.firebaseService
      .updateCmsContactData('-NPfScA4r5sR1HSAuRJm', data)
      .then((res) => {
        this.isUpdating = this.isUpdating ? false : true;
        this.isLoading = false;

        this.localStorageRefreshItem();
        this.message.success('Data updated successfully');
        console.log(res, 'success');
      });
  }

  localStorageRefreshItem(): void {
    localStorage.removeItem('contactData');
    this.getContactsData();
  }
}
