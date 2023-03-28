import { Component, Input, OnInit, Output,EventEmitter, HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';
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
  styleUrls: ['./telemedicine-table.component.scss'],
})
export class TelemedicineTableComponent implements OnInit {
  @Input() dataItems: any[] = [];
  @Input() isSpinning: boolean = false;

  @Input() listOfColumns: ColumnItem[] = [];
  @Output() actions:any =new EventEmitter()

  public pageSize:number = 5
  public selectedPage:number = 1

  public newDataList:any[]=[]

  public isMobileView:boolean = false


  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
      this.isMobileView = window.innerWidth < 767;


    
      const pageIndex = (this.selectedPage - 1) * this.pageSize
      this.newDataList = this.dataItems.slice(pageIndex,this.pageSize)
      console.log(this.newDataList)

      if(!environment.production){
        console.clear()
      }
  }

  // get pageNumbers():number[]{
    
  //   return Array(Math.ceil(this.dataItems.length / this.pageSize)).fill(0).map((x,i) =>i + 1) 
  // }

  // public changePage(page:number, action:string):void{
  //   if(action ==='number'){
  //     this.selectedPage = page

  //     return
  //   }

  //   if(action ==='number'){
  //     this.selectedPage += page

  //     return
  //   }

  //   if(action ==='number'){
  //     this.selectedPage += page

  //     return
  //   }
  // }

  // public slicedData():void{

  //   const pageIndex = (this.selectedPage -1) * this.pageSize
  //   const endIndex = (this.selectedPage -1) * this.pageSize + this.pageSize
  //   this.newDataList=[]
  //   this.newDataList=this.dataItems.slice(pageIndex, endIndex)


  // }

  emitActions(data:any) {

    this.actions.emit(data)
    
  }

  confirm() {}
  cancel() {}


  @HostListener('window: resize', ['$event.target'])
  public onResize(eventTarget: EventTarget): void {
    if ((<Window>eventTarget).innerWidth < 767) {
      if (!this.isMobileView) {
        this.isMobileView = true;
      }
    }
    if ((<Window>eventTarget).innerWidth >= 767) {
      if (this.isMobileView) {
        this.isMobileView = false;
      }
    }
    console.log((<Window>eventTarget).innerWidth);
  }
}
