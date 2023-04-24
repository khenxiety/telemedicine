import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public auth: AuthServiceService,
    public router: Router,
    private message: NzMessageService
  ) {}

  showError() {
    this.message.error(
      'You need to login first before accesing this page'
    );
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/search']);
      this.showError();

      return false;
    }
    return true;
  }
  canActivateAdmin(): boolean {
    if (!this.auth.isAdminAuthenticated()) {
      this.router.navigate(['/search']);
      this.showError();
      return false;
    }
    return true;
  }
  // canDeactivate(): boolean {
  //   if (this.auth.isAuthenticated()) {
  //     this.router.navigate(['/user-dashboard']);
  //     console.log('login');

  //     return true;
  //   }
  //   return false;
  // }
}
