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
import { catchError, Subscription, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { SessionStorage } from 'src/app/enums/enums';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss'],
})
export class UpdatePageComponent implements OnInit, OnDestroy {
  private dataId: string = '';
  public patientData: any;
  public isLoading: boolean = false;
  public isUpdating: boolean = false;
  
  private ubsubscribeData: Subscription = new Subscription();


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


  public imageUrl:any =[]
  constructor(
    private breadcrumbsService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private message: NzMessageService,
    private httpClient:HttpClient,
    private location:Location,
    private sanitizer:DomSanitizer
  ) {}

  async ngOnInit() {
    this.isBackButtonOn.emit(true);
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
      childPage: 'Patient Details'
    });

    await this.activatedRoute.params.subscribe((res) => {
      this.dataId = res['id'];
    });
    this.getDataById();
  }

  ngOnDestroy(): void {
    if (this.ubsubscribeData) {
      this.ubsubscribeData.unsubscribe();
    }
  }

  onBack():void{
    this.location.back()

  }

  getDataById(): void {
    this.isLoading = true;
      this.ubsubscribeData = this.firebaseService
      .getSingleDataSnapshot(this.dataId) 
      .pipe(
        catchError((err: any) => {
          this.isLoading = false;
          return throwError(() =>new Error(err));
        })
      )
      .subscribe((response) => {
        if(response.data){
          this.patientData = response.data; 
          this.convertToImage(response.data)
          this.buildFormData(this.patientData);
          this.isLoading = false;
        }
        else{
          this.message.error(response.message);
          this.isLoading = false;

        }
      });


  }

  buildFormData(data: any): void {
    this.updateFormGroup = new FormGroup({
      address: new FormControl(data.address || '', [Validators.required]),
      age: new FormControl(data.age || '', [Validators.required]),
      birthdate: new FormControl(data.birthdate || '', [Validators.required]),
      breathRate: new FormControl(data.breathRate || '', [
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
  onClickConfirm(action:string) {

    if(!this.updateFormGroup.valid && action !='delete'){
      this.message.error('Please fill up all the fields');

      return
    }

    switch(action){
      case 'update':
        this.updatePatientData()
        break; 
      case 'delete':
        this.deletePatientData()
        break;
    }
    
  }

  cancelDelete():void{

  }

  exportToPdf(): void {
    const data = document.getElementById('record')!;
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('filename.pdf');
    });
  }

  async updatePatientData():Promise<void> {
    this.isLoading = true;
    const data = {
      ...this.updateFormGroup.value,
    };
    try {
      const dataUpdate = await this.firebaseService.updatePatientData(this.dataId, data)
      this.isUpdating = false;
      this.getDataById();
      sessionStorage.removeItem('recipes');
      this.message.success('Record updated successfully');
      return Promise.resolve(dataUpdate)
    } catch (error) {
      throw error
    }
  }

  async deletePatientData():Promise<void>{
    this.isLoading = true;
    try {
      const dataRemove = await this.firebaseService.removeData(this.dataId)
      this.message.success('Data deleted successfully');
      this.router.navigate(['/admin/manage'])
      sessionStorage.removeItem(SessionStorage.Data)
     
      return Promise.resolve(dataRemove)
      
    } catch (error) {
      throw error
    }
  }

  convertToImage(data:any){
    data.image.forEach((res:any) => {
      const byteCharacters = atob(res);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      const url = URL.createObjectURL(blob);

      this.imageUrl.push(this.sanitizer.bypassSecurityTrustUrl(url));
    });

    
  }
}
