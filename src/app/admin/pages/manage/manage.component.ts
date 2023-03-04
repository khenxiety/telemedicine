import { Component, OnInit,ViewChild } from '@angular/core';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TelemedicineTableComponent } from '../../components/telemedicine-table/telemedicine-table.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild(TelemedicineTableComponent) telemedicineTable:TelemedicineTableComponent | undefined
  date:any

  data:any[]=[]

  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';

  public isLoading:boolean=false

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit(): void {
    // this.firebaseService.getDataSnapshot().subscribe(res =>{
    //   console.log(res)
    //   const newData:any[]=[]
    //   for(const i in res['data']){
    //     newData.push({id:i,...res['data'][i]})
    //   }
    //   this.data = newData
    //   sessionStorage.setItem('recipes', JSON.stringify(this.data));
    //   this.isLoading =false
    // })

    this.loadData()
  }
  loadData(reload?:boolean){
    this.isLoading =true
    const check = sessionStorage.getItem('recipes');
    if(check && !reload){
      this.data = JSON.parse(check)
      this.isLoading = false;
    }else{
      this.firebaseService.getDataRealtime().subscribe(res =>{
        const newData:any[]=[]
        for(const i in res['data']){
          newData.push({id:i,...res['data'][i]})
        }
        console.log(res)
        this.data = newData
        sessionStorage.setItem('recipes', JSON.stringify(this.data));
        setTimeout(() => {
        this.isLoading = false;
          
        }, 800);
      })

    }

    
  }
  

  refresh(){
    this.data =[]
    sessionStorage.clear()
    this.loadData(true)
    // this.telemedicineTable?.ngOnInit()
  }

  test(event:any){
    console.log(event)
    this.date = event
  }

  filterByDateRange(){

    if(this.date){
      console.log( Helper.dateFormatter(this.date[0]) ,'->',Helper.dateFormatter(this.date[1]))

    }else{
      console.log('please select a date')
    }
  }

}
