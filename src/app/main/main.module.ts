import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './main.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TelemedicineHeaderComponent } from './components/telemedicine-header/telemedicine-header.component';
import { TelemedicineFooterComponent } from './components/telemedicine-footer/telemedicine-footer.component';
import { NgZorroModule } from '../ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgBgComponent } from './components/img-bg/img-bg.component';
import { TelemedicineDetailCardsComponent } from './components/telemedicine-detail-cards/telemedicine-detail-cards.component';
import { TelemedicineInputComponent } from './components/telemedicine-input/telemedicine-input.component';
import { TelemedicineTextAreaComponent } from './components/telemedicine-text-area/telemedicine-text-area.component';
import { ImgFooterComponent } from './components/img-footer/img-footer.component';
import { EmptyPageComponent } from '../empty-page/empty-page.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'search',
        component: LandingPageComponent,
      },
      {
        path: 'contact',
        component: ContactPageComponent,
      },
      {
        path: 'details/:id',
        component: DetailsPageComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    LandingPageComponent,
    DetailsPageComponent,
    TelemedicineHeaderComponent,
    TelemedicineFooterComponent,
    ImgBgComponent,
    TelemedicineDetailCardsComponent,
    TelemedicineInputComponent,
    TelemedicineTextAreaComponent,
    ImgFooterComponent,
    ContactFormComponent,
    ContactPageComponent,
  ],
  exports: [TelemedicineInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class MainModule {}
