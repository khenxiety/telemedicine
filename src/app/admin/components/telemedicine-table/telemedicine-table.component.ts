import { Component, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EventEmitter } from 'stream';

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

  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.isSpinning == false) {
      console.log(this.dataItems);
    }
  }

  deleteData(id: string) {
    this.isSpinning = true;
    this.firebaseService.removeData(id).then((res) => {
      this.message.success('Data deleted successfully');
      this.isSpinning = false;

      console.log('removed', res);
    });
  }

  confirm() {}
  cancel() {}
}
