import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Helper } from 'src/app/helpers/helper.helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TelemedicineTableComponent } from '../../components/telemedicine-table/telemedicine-table.component';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
interface DataItem {
  name: string;
  gender: number;
  address: string;
}
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  @ViewChild(TelemedicineTableComponent) telemedicineTable:
    | TelemedicineTableComponent
    | undefined;
  date: any[] = [];

  data: any[] = [];

  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';

  public isLoading: boolean = false;

  public listOfColumns: ColumnItem[] = [];

  public scroll: boolean = false;
  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService,
    private breadcrumbsService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private route: ActivatedRoute
  ) {}

  @HostListener('scroll', ['$event']) onscroll(event: any) {
    const container = this.elementRef.nativeElement;
    const scrollPosition = container.scrollTop;
    console.log(event);
    // if (window.scrollY > 10) {
    //   this.scroll = true;
    // } else {
    //   this.scroll = false;
    // }
  }
  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
    });
    this.loadData();
    this.route.data.subscribe((res) => {
      console.log(res);
    });
    // this.addMockData();
  }

  loadData(reload?: boolean) {
    this.isLoading = true;
    const check = sessionStorage.getItem('recipes');
    if (check && !reload) {
      this.data = JSON.parse(check);
      this.setColumns(this.data);
      this.isLoading = false;
    } else {
      this.firebaseService.getDataRealtime().subscribe((res) => {
        this.data = Helper.toArrayObjects(res);
        sessionStorage.setItem('recipes', JSON.stringify(this.data));
        this.setColumns(this.data);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
    }
  }

  setColumns(data: any) {
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: null,
        sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: data.map((res: DataItem) => {
          return { text: res?.name, value: res?.name };
        }),
        filterFn: (list: string[], item: DataItem) => {
          console.log(list);
          return list.some((name) => item.name.indexOf(name) !== -1);
        },
      },
      {
        name: 'Gender',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
      },
      {
        name: 'Address',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: DataItem, b: DataItem) =>
          a.address.length - b.address.length,
        filterMultiple: false,
        listOfFilter: data.map((res: DataItem) => {
          return { text: res.address, value: res.address };
        }),
        filterFn: (address: string, item: DataItem) =>
          item.address.indexOf(address) !== -1,
      },
      {
        name: 'Actions',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
      },
    ];
  }

  public refresh(): void {
    this.data = [];
    sessionStorage.clear();
    this.loadData(true);
    // this.telemedicineTable?.ngOnInit()
  }

  public datePick(event: any): void {
    console.log(event);
    this.date = event;
  }

  filterByDateRange() {
    if (this.date) {
      this.isLoading = true;
      this.firebaseService
        .getDataByDateRange(
          Helper.dateFormatter(this.date[0]),
          Helper.dateFormatter(this.date[1])
        )
        .subscribe((res) => {
          this.data = Helper.toArrayObjects(res);
          this.isLoading = false;
          console.log(this.data);
        });
    } else {
      console.log('please select a date');
    }
  }

  addMockData() {
    for (let i = 0; i < 15; i++) {
      const data = {
        address: `test${i}`,
        age: 25,
        birthdate: '08-31-1999',
        bloodPressure: '23/2',
        contactNumber: '09999706684',
        date: `2023-03-${i < 9 ? '0' + i.toString() : i}`,
        gender: 'male',
        heartRate: 23,
        height: 34,
        image: 'insert image blob here',
        name: `testData${i}`,
        oxygenSaturation: 'bohai2',
        temperature: 34,
        weight: 34,
      };
      this.firebaseService.addData(data).then((res) => {
        console.log(res, 'success');
      });
    }
  }
}
