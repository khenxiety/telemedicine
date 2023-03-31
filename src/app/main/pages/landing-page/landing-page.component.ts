import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  inputText: string = '';

  public formGroup: FormGroup = new FormGroup({
    search : new FormControl('', Validators.required)
  })
  

  constructor(private firebaseService:FirebaseService, private router:Router, private message:NzMessageService) {}

  ngOnInit(): void {
  }

  getDataByName():void{
    if(!this.formGroup.valid){
      this.message.error('Please enter patient name')
      return
    }

    
    this.firebaseService.getDataByName(this.formGroup.get('search')?.value).subscribe(res =>{
      if(!res.data){
        this.message.error(`No record found for ${this.formGroup.get('search')?.value}` )
        return
      }
      this.router.navigate(['details/',Object.keys(res.data)[0].replace('-','')])
    })
  }
  
}
