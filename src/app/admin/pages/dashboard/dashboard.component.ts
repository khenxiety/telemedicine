import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TelemedicineTableComponent } from '../../components/telemedicine-table/telemedicine-table.component';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { Helper } from 'src/app/helpers/helper.helper';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(TelemedicineTableComponent) telemedicineTable:
    | TelemedicineTableComponent
    | undefined;

  data: any[] = [];

  public patientDataCount:number = 0
  public staffsCount:number = 0


  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbsService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Analytics',
    });

    this.getPatients()
    this.getUsers()
  }

  getPatients(){
    this.firebaseService.getDataRealtime().subscribe({
      next:async (res) =>{
        this.patientDataCount = Helper.toArrayObjects(res).length
        console.log(Helper.toArrayObjects(res).length)
      },
      error:(err) =>{
        throw err
      }
    })
  }

  getUsers(){
    this.firebaseService.getAccountsRealtime().subscribe({
      next:async (res) =>{
        this.staffsCount = Helper.toArrayObjects(res).length
        console.log(Helper.toArrayObjects(res).length)
      },
      error:(err) =>{
        throw err
      }
    })
  }
}
