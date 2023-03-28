import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelemedicineTableComponent } from './telemedicine-table/telemedicine-table.component';
import { TelemedicineListComponent } from './telemedicine-list/telemedicine-list.component';
import { TelemedicineAdminInputComponent } from './telemedicine-admin-input/telemedicine-admin-input.component';

@NgModule({
  declarations: [
    TelemedicineTableComponent,
    TelemedicineListComponent,
    TelemedicineAdminInputComponent,
  ],
  exports: [
    TelemedicineTableComponent,
    TelemedicineListComponent,
    TelemedicineAdminInputComponent,
  ],
  imports: [CommonModule, NgZorroModule, FormsModule, ReactiveFormsModule],
})
export class AdminComponentsModule {}
