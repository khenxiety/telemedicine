import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from 'src/app/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { TelemedicineTableComponent } from './telemedicine-table/telemedicine-table.component';




@NgModule({
  declarations: [
    TelemedicineTableComponent
    
  ],
  exports:[TelemedicineTableComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
  ],
})
export class AdminComponentsModule {}
