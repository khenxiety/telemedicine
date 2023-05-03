import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getISOWeek } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Helper } from 'src/app/helpers/helper.helper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  public activeData: string = '';
  public patientData: any[] =[];
  // date = null;
  isEnglish = false;
  public isLoading:boolean = false
  dateFormat = 'yyyy/MM/dd';
  date:any[]=[] || null
  imageUrl: any[]=[]
  safeImageUrl!: SafeUrl;
  array = [1, 2, 3, 4];
  effect = 'scrollx';

  public formGroup: FormGroup = new FormGroup({
    search : new FormControl('', Validators.required)
  })
  constructor(
    private firebaseService: FirebaseService,
    private i18n: NzI18nService,
    private activatedRoute:ActivatedRoute,
    private message:NzMessageService,
    private sanitizer: DomSanitizer
  ) {

    this.activatedRoute.params.subscribe((res) => {
      this.activeData = res['id'];
    });


  }

  ngOnInit(): void {
    this.firebaseService
      .getSingleDataSnapshot(this.activeData)
      .subscribe((res) => {
        if(!res.data){
          throw new Error(res.message)
        }
        this.patientData.push(res.data);
        if(Array.isArray(res.data.image)){
          this.convertToImage(this.patientData[0])
          return
        }else{
          this.imageUrl.push(res.data.image)
        }
      });
    
  }

  onSearch():void{
    if(!this.formGroup.valid){
      this.message.error('Please enter patient name')
      return
    }
    this.firebaseService.getDataByName(this.formGroup.get('search')?.value).subscribe({
      next:(res) =>{
        if(!res.data){
          this.message.error(`No record found for ${this.formGroup.get('search')?.value}` )
          return
        }
        this.patientData = []
        this.imageUrl = []

        this.patientData.push(res.data[Object.keys(res.data)[0]]);
        if(Array.isArray(res.data[Object.keys(res.data)[0]].image)){
          this.convertToImage(this.patientData[0])
          return
        }else{
          this.imageUrl.push(res.data.image)
        }

      },
      error:(error) =>{
        this.message.error(error)
      }
    })
  }

  onChange(result: any): void {
    this.date = result;
    if(!Helper.dateFormatter(this.date[1]).includes('NaN')){
      console.log('test')
      this.filterByDateRange()
    }
  }

  filterByDateRange() {
    if (this.date) {
      this.isLoading = true;
      this.firebaseService
        .getDataByDateRange(
          Helper.dateFormatter(this.date[0]),
          Helper.dateFormatter(this.date[1])
        )
        .subscribe((res) => {
          this.patientData = Helper.toArrayObjects(res)
          // this.telemedicineTable?.ngOnInit()
          this.isLoading = false;

        });
    } else {
      this.message.info('Please select a date')
    }
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
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
