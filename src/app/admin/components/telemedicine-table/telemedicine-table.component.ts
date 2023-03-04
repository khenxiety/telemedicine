import { Component, Input, OnInit } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { FirebaseService } from 'src/app/services/firebase.service';

interface DataItem {
  name: string;
  gender: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-telemedicine-table',
  templateUrl: './telemedicine-table.component.html',
  styleUrls: ['./telemedicine-table.component.scss']
})
export class TelemedicineTableComponent implements OnInit {
  @Input() dataItems:any[]=[]
  @Input() isSpinning:boolean =false

  listOfColumns: ColumnItem[] = [];

  listOfColumns2: ColumnItem[] =[]
  // listOfData: DataItem[] = [
  //   {
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park'
  //   }
  // ];
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit(): void {
    if(this.dataItems){
      this.listOfColumns = [
        {
          name: 'Name',
          sortOrder: null,
          sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: this.dataItems.map(res =>{
            return {text: res.name, value: res.name}
          }),
          filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
        },
        {
          name: 'Gender',
          sortOrder: null,
          sortFn: null,
          sortDirections: [null],
          listOfFilter: [],
          filterFn: null,
          filterMultiple: false
        },
        {
          name: 'Address',
          sortOrder: null,
          sortDirections: ['ascend', 'descend', null],
          sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
          filterMultiple: false,
          listOfFilter:  this.dataItems.map(res =>{
            return {text: res.address, value: res.address}
          }) ,
          filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
        },
        {
          name: 'Actions',
          sortOrder: null,
          sortFn: null,
          sortDirections: [null],
          listOfFilter: [],
          filterFn: null,
          filterMultiple: false
        }
      ]

    }
    // for(const i in this.dataItems[0]){


    //   if(i ==='name' || i ==='address' || i ==='gender'  ){
    //     this.listOfColumns2.push(
    //       {
    //         name: i,
    //         sortOrder: null,
    //         sortFn: (a: any, b: any) => a[i].localeCompare(b[i]),
    //         sortDirections: ['ascend', 'descend', null],
    //         filterMultiple: true,
    //         listOfFilter: this.dataItems.map((res:any )=>{
    //           return {text: res[i],value: res[i]}
    //         }),
    //         filterFn: (list: string[], item: any) => list.some(name => item[i].indexOf(name) !== -1)
    //       }
    //     )
    //   }
      
      
    // }

    
    // console.log(cols)
  }


  deleteData(id:string){

    this.firebaseService.removeData(id).then(res =>{
      console.log('removed',res)
    })
  }
  

}
