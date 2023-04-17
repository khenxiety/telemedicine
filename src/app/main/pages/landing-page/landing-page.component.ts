import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailJSResponseStatus } from '@emailjs/browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RefreshService } from 'src/app/services/common/refresh.service';
import { EmailjsService } from 'src/app/services/emailjs.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  inputText: string = '';

  public formGroup: FormGroup = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private message: NzMessageService,
    private auth: Auth,
    private refresherService: RefreshService,
    private emailService:EmailjsService
  ) {}

  async ngOnInit() {
    // const currentUser = await this.auth.currentUser
    // if(currentUser == null){
    //   this.router.navigate(['/**'])
    // }
  }

  getDataByName(): void {
    if (!this.formGroup.valid) {
      this.message.error('Please enter patient name');
      return;
    }

    this.firebaseService
      .getDataByName(this.formGroup.get('search')?.value)
      .subscribe((res) => {
        if (res.status == 400) {
          if (res.message == 'Permission denied') {
            this.message.error(`${res.message}, Login first to continue`);
            this.router.navigate(['/login']);
            return;
          }
          if (!res.data) {
            this.message.error(
              `No record found for ${this.formGroup.get('search')?.value}`
            );
            return;
          }
          return;
        }

        this.router.navigate([
          'details/',
          Object.keys(res.data)[0].replace('-', ''),
        ]);
      });
  }

  
}
