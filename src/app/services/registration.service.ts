import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  Auth,
  updateProfile,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Database,
  get,
  orderByChild,
  ref,
  query,
  push,
  equalTo,
  update,
} from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage/localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private db: Database, private authService: Auth, private localStorageService:LocalstorageService) {}

  async userSignup(data: any): Promise<any> {
    try {
      const createUser = await createUserWithEmailAndPassword(
        this.authService,
        data.email,
        data.password
      );
      await updateProfile(createUser.user, {
        displayName: data.firstName,
      });
      const addData = await this.updateAccountApproved(data, createUser.user.uid);
      return Promise.resolve({
        status: 200,
        message: 'Registration Successfull',
      });
    } catch (error: any) {
      console.error(error.message);
      return Promise.reject(error);
    }
  }

  async addData(data: any): Promise<any> {
    try {
      const reg = {
        ...data.value,
        type: 'user',
        status:'pending',
      };

      const dbInstance = ref(this.db, 'users/');
      const res = await push(dbInstance, reg);
      return Promise.resolve({
        status: 200,
        message: 'Registration Successfull',
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  updateAccountApproved(data: any,uid:any): Promise<void> {
    const dbInstance = ref(this.db, `users/${data.id}`);
    const modifiedData = { status:'approved', uid:uid };
    return update(dbInstance, modifiedData).catch((err) => {
      return Promise.reject(err);
    });
  }

  async userLogin(data: any): Promise<any> {
    try {
      const loginUser = await signInWithEmailAndPassword(
        this.authService,
        data.value.email,
        data.value.password
      );

      const verification = await this.roleVerification(data.value.email);

      if (verification ) {
        const data ={
          type:verification.type,
          ...loginUser
        }
        return { status: 200, message: 'Login Successfully', data: data };
      } else {
        this.userLogout();
        throw { status: 'error', code: 'User does not exist' };
      }
    } catch (error: any) {
      console.error(error.code);
      return Promise.reject(error);
    }
  }

  async roleVerification(data: any): Promise<any> {
    const dbInstance = ref(this.db, 'users/');
    const sortedData = query(dbInstance, orderByChild('email'));
    const filteredData = query(sortedData, equalTo(data));

    try {
      const role = await get(filteredData);
      if (role.exists()) {
        const userData = role.val();
        return Promise.resolve(userData ? Object.values(userData)[0] : null);
      } else {
        return Promise.resolve(undefined);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async userLogout(): Promise<any> {
    try {
      const signout = await this.authService.signOut();
      this.localStorageService.removeItem('user')
      return signout;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
