import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroModule } from './ng-zorro.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { mainModule } from 'process';
import { MainModule } from './main/main.module';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

registerLocaleData(en);
export function tokenGetter() {
  const {user:{stsTokenManager:{ accessToken:token}}} = JSON.parse(localStorage.getItem('user')!);

  return  token;
}

@NgModule({
  declarations: [AppComponent, EmptyPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ScreenTrackingService,
    UserTrackingService,
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
