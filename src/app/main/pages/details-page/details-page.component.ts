import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getISOWeek } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  public activeData: string = '';
  public data: any;
  date = null;
  isEnglish = false;

  public formGroup: FormGroup = new FormGroup({
    search : new FormControl('', Validators.required)
  })


  constructor(
    private firebaseService: FirebaseService,
    private i18n: NzI18nService,
    private activatedRoute:ActivatedRoute,
    private message:NzMessageService
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

        this.data = res.data;
      });
    
  }

  onSearch():void{
    console.log(this.formGroup.get('search')?.value)
    if(!this.formGroup.valid){
      this.message.error('Please enter patient name')
      return
    }

    this.firebaseService.getDataByName(this.formGroup.get('search')?.value).subscribe(res =>{
      console.log(res.data)
      if(!res.data){
        this.message.error(`No record found for ${this.formGroup.get('search')?.value}` )
        return
      }
      this.data = res.data[Object.keys(res.data)[0]];
    })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
