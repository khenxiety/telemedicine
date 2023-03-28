import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from 'src/app/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { TelemedicineTableComponent } from './telemedicine-table/telemedicine-table.component';
import { TelemedicineAdminInputComponent } from './telemedicine-admin-input/telemedicine-admin-input.component';

@NgModule({
  declarations: [TelemedicineTableComponent, TelemedicineAdminInputComponent],
  exports: [TelemedicineTableComponent, TelemedicineAdminInputComponent],
  imports: [CommonModule, NgZorroModule, FormsModule],
})
export class AdminComponentsModule {}
