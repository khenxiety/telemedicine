import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TelemedicineTableComponent } from '../../components/telemedicine-table/telemedicine-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(TelemedicineTableComponent) telemedicineTable:TelemedicineTableComponent | undefined

  data:any[]=[]

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit(): void {
    

    
  }

  

}
