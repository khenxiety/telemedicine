import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserAuthService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NzMessageService],
})
export class LoginComponent implements OnInit {
  contactData: any[] = [];

  public isMobileView: boolean = false;

  public isSignup: boolean = false;

  public isLoading: boolean = false;

  public signupArray: any[] = [
    {
      controlName: 'firstName',
      placeholder: 'Firstname',
      type: 'text',
      errorTip: 'Please enter your Firstname',
      icon: 'user',
    },
    {
      controlName: 'lastName',
      placeholder: 'Lastname',
      type: 'text',
      errorTip: 'Please enter your Lastname',
      icon: 'user',
    },
    {
      controlName: 'licenseNumber',
      placeholder: 'License number',
      type: 'text',
      errorTip: '',
      icon: 'number',
    },
    {
      controlName: 'email',
      placeholder: 'Email',
      type: 'text',
      errorTip: 'Please enter a valid email',
      icon: 'mail',
    },
    {
      controlName: 'number',
      placeholder: 'Phone number',
      type: 'number',
      errorTip: 'Please enter a valid phone number',
      icon: 'phone',
    },
    {
      controlName: 'password',
      placeholder: 'Password',
      type: 'password',
      errorTip: 'Please enter a password',
      icon: 'key',
    },
    {
      controlName: 'reEnterPassword',
      placeholder: 'Re-enter Password',
      type: 'password',
      errorTip: 'Please re-enter password',
      icon: 'key',
    },
  ];

  public signupFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    licenseNumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    reEnterPassword: new FormControl('', Validators.required),
  });

  public loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public progressValue: number = 0;
  public progressHintText: string = '';
  public progressText: string = '';
  public textClass: any = '';
  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService,
    private registrationService: UserAuthService,
    private router: Router,
    private auth:Auth
  ) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth < 767;
    this.getContactsData();
    this.passwordStrenthChecker();
    console.log(this.auth)
  }

  getContactsData(): void {
    const localStorageData = localStorage.getItem('contactData');

    if (localStorageData) {
      this.contactData = JSON.parse(localStorageData);
    } else {
      this.firebaseService.getCmsContactData().subscribe((res) => {
        this.contactData = Helper.toArrayObjects(res);
        localStorage.setItem('contactData', JSON.stringify(this.contactData));
      });
    }
  }

  onClick(action: string): void {
    switch (action) {
      case 'signup':
        this.userSignUp();
        break;
      case 'login':
        this.userLogin();
        break;
    }
  }

  async userSignUp() {
    const { password, reEnterPassword } = this.signupFormGroup.controls;

    if (!this.signupFormGroup.valid) {
      this.signupFormGroup.markAllAsTouched();
      this.message.error('Please fill up all the fields');
      return;
    }

    if (this.progressValue <= 100) {
      this.message.error('Password does not meet the requirements');
      return;
    }

    if (password.value !== reEnterPassword.value) {
      this.message.error('Password does not match');
      return;
    }

    try {
      this.isLoading = true;
      const registration = await this.registrationService.userSignup(
        this.signupFormGroup
      );
      if (registration.status === 200) {
        this.signupFormGroup.reset();
        this.isSignup = false;
        this.message.success(registration.message);
      }
    } catch (error: any) {
      console.error(error);
      this.message.error(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  async userLogin() {
    if (!this.loginFormGroup.valid) {
      this.message.error('Please fill up all the fields');
      return;
    }

    try {
      this.isLoading = true;

      const login = await this.registrationService.userLogin(
        this.loginFormGroup
      );

      console.log(login,this.auth)
      if (login.status === 200) {
        this.signupFormGroup.reset();
        this.isLoading = false;
        this.isSignup = false;
        this.message.success(login.message);
        this.router.navigate(['/search']);
      }
    } catch (error: any) {
      console.error(error);
      this.message.error(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  passwordStrenthChecker() {
    const password = this.signupFormGroup?.get('password');
    const validationRules = [
      { regex: /[\W_]/, hint: '(Add special characters)' },
      { regex: /[A-Z]/, hint: '(Add an uppercase letter)' },
      { regex: /^.{8,}$/, hint: '(Password should be 8 or more characters)' },
    ];

    password?.valueChanges.subscribe((value: string) => {
      let progressValue = 0;
      let progressText = '';
      let textClass = 'danger';
      let progressHint = '';

      validationRules.forEach((rule) => {
        if (!rule.regex.test(value)) {
          progressHint = rule.hint;
        } else {
          progressValue += 34;
        }
      });

      const progressTextMap: any = {
        0: { class: 'exception|danger', text: 'Very Weak' },
        30: { class: 'exception|danger', text: 'Weak' },
        60: { class: 'active|warning', text: 'Good' },
        90: { class: 'success|success', text: 'Strong' },
      };

      const progressValueKeys = Object.keys(progressTextMap)
        .map(parseFloat)
        .sort()
        .reverse();
      for (const key of progressValueKeys) {
        if (progressValue >= key) {
          textClass = progressTextMap[key].class;
          progressText = progressTextMap[key].text;
          break;
        }
      }

      this.progressValue = progressValue;
      this.progressHintText = progressHint;
      this.progressText = progressText;
      this.textClass = textClass;
    });
  }

  @HostListener('window: resize', ['$event.target'])
  public onResize(eventTarget: EventTarget): void {
    if ((<Window>eventTarget).innerWidth < 767) {
      if (!this.isMobileView) {
        this.isMobileView = true;
      }
    }
    if ((<Window>eventTarget).innerWidth >= 767) {
      if (this.isMobileView) {
        this.isMobileView = false;
      }
    }
  }
}
