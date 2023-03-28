import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroModule } from 'src/app/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { TelemedicineTableComponent } from './telemedicine-table/telemedicine-table.component';
import { TelemedicineListComponent } from './telemedicine-list/telemedicine-list.component';




@NgModule({
  declarations: [
    TelemedicineTableComponent,
    TelemedicineListComponent
    
  ],
  exports:[TelemedicineTableComponent,TelemedicineListComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
  ],
})
export class AdminComponentsModule {}
