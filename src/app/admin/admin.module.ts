import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminComponentsModule } from './components/admin-components.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgZorroModule } from '../ng-zorro.module';
import { TelemedicineSidenavComponent } from './components/telemedicine-sidenav/telemedicine-sidenav.component';
import { TelemedicineTableComponent } from './components/telemedicine-table/telemedicine-table.component';
import { ManageComponent } from './pages/manage/manage.component';
import { FormsModule } from '@angular/forms';
import { ContactInformationPageComponent } from './pages/contact-information-page/contact-information-page.component';

const route: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'manage',
        component: ManageComponent,
      },
      // cms
      {
        path: 'contact-update',
        component: ContactInformationPageComponent,
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    TelemedicineSidenavComponent,
    DashboardComponent,
    ManageComponent,
    ContactInformationPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    NgZorroModule,
    FormsModule,
    AdminComponentsModule,
  ],
})
export class AdminModule {}
