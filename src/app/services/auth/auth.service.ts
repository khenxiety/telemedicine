import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData: any;

  constructor(
    public jwtHelper: JwtHelperService,
    private auth: Auth,
    private router: Router,
  ) {}

  public isAuthenticated(): boolean {
    const userdata = JSON.parse(localStorage.getItem('user')!);
    let token =''
    if(userdata){
      const {user:{stsTokenManager:{ accessToken:accesstoken}}} = userdata;
      token = accesstoken
    }
    return !this.jwtHelper.isTokenExpired(userdata ? token : userdata);

  }

  public isAdminAuthenticated(): boolean {
    const {user:{stsTokenManager:{ accessToken:token}}} = JSON.parse(localStorage.getItem('user')!);

    return !this.jwtHelper.isTokenExpired(token);
  }
  isLoggedIn() {
    const token = localStorage.getItem('token')!;

    if (!token) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['user-dashboard']);
    }
  }

}
