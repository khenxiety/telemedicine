import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Helper } from 'src/app/helpers/helper.helper';
import { catchError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss'],
})
export class UpdatePageComponent implements OnInit, OnDestroy {
  private dataId: string = '';
  public patientData: any;
  private ubsubscribeData: any;
  public isLoading: boolean = false;
  public isUpdating: boolean = false;

  public updateFormGroup: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    bloodPressure: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    heartRate: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    oxygenSaturation: new FormControl('', [Validators.required]),
    temperature: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  });

  @Output() isBackButtonOn: any = new EventEmitter<boolean>();

  constructor(
    private breadcrumbsService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private message: NzMessageService
  ) {}

  async ngOnInit() {
    this.isBackButtonOn.emit(true);
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
      childPage: 'Patient Details',
    });

    await this.activatedRoute.params.subscribe((res) => {
      this.dataId = res['id'];
    });
    this.getDataById();
  }

  ngOnDestroy(): void {
    this.ubsubscribeData.unsubscribe();
  }

  getDataById(): void {
    this.ubsubscribeData = this.firebaseService
      .getSingleDataSnapshot(this.dataId)
      .pipe(
        catchError((err: any) => {
          throw new Error(err);
        })
      )
      .subscribe((response) => {
        this.patientData = response.data;
        this.buildFormData(this.patientData);
        console.log(this.patientData);
      });
  }

  buildFormData(data: any): void {
    this.updateFormGroup = new FormGroup({
      address: new FormControl(data.address || '', [Validators.required]),
      age: new FormControl(data.age || '', [Validators.required]),
      birthdate: new FormControl(data.birthdate || '', [Validators.required]),
      bloodPressure: new FormControl(data.bloodPressure || '', [
        Validators.required,
      ]),
      contactNumber: new FormControl(data.contactNumber || '', [
        Validators.required,
      ]),
      gender: new FormControl(data.gender || '', [Validators.required]),
      heartRate: new FormControl(data.heartRate || '', [Validators.required]),
      height: new FormControl(data.height || '', [Validators.required]),
      name: new FormControl(data.name || '', [Validators.required]),
      oxygenSaturation: new FormControl(data.oxygenSaturation || '', [
        Validators.required,
      ]),
      temperature: new FormControl(data.temperature || '', [
        Validators.required,
      ]),
      weight: new FormControl(data.weight || '', [Validators.required]),
    });
  }

  onClickUpdate() {
    this.isUpdating = this.isUpdating ? false : true;
    this.message.info(this.isUpdating ? 'Update mode' : 'View mode');
  }
  onClickConfirm() {
    this.isLoading = true;
    const data = {
      ...this.updateFormGroup.value,
    };
    this.firebaseService.updatePatientData(this.dataId, data).then((res) => {
      this.isUpdating = false;
      this.isLoading = false;
      this.getDataById();

      sessionStorage.removeItem('recipes');
      this.message.success('Record updated successfully');
    });
  }
}
