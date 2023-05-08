import { Component, Input, OnInit, Output,EventEmitter, HostListener } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
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

  @Input() listOfColumns: any[] = [];
  @Input() isManageData:boolean = false;
  @Input() isManageAccount:boolean = false;


  @Output() actions:any =new EventEmitter()

  public pageSize:number = 5
  public selectedPage:number = 1

  public newDataList:any[]=[]

  public isMobileView:boolean = false

  public modalsData:any
  public isVisible:boolean = false

  constructor() {}

  ngOnInit(): void {
      this.isMobileView = window.innerWidth < 767;
      const pageIndex = (this.selectedPage - 1) * this.pageSize
      this.newDataList = this.dataItems.slice(pageIndex,this.pageSize)
  }

  emitActions(data:any) {
    this.actions.emit(data)
  }

  confirm() {}
  cancel() {}

  openModal(data:any){
    this.isVisible = true
    console.log(data)
    this.modalsData = data
  }

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
  }

  close(){

    this.isVisible = false
  }
}
