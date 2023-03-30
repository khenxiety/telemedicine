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
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  public tableView: boolean = true
  public pageSize: number = 5
  public selectedPage: number = 1

  public newDataList: any[] = []

  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService,
    private breadcrumbsService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  // @HostListener('scroll', ['$event']) onscroll(event: any) {
  //   // const container = this.elementRef.nativeElement;
  //   // const scrollPosition = container.scrollTop;
  //   const div = this.elementRef.nativeElement.querySelector('#myDiv');

  //   if(div){
  //   const scrollTop = div.scrollTop;

  //     console.log(scrollTop)
  //   }
  // }
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

  switchView() {
    this.tableView = this.tableView ? false : true
  }

  // get pageNumbers():number[]{

  //   return Array(Math.ceil(this.data.length / this.pageSize)).fill(0).map((x,i) =>i + 1) 
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
  //   this.newDataList=this.data.slice(pageIndex, endIndex)


  // }

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
    this.date = []
    this.loadData(true);
    this.telemedicineTable?.ngOnInit()

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
          this.telemedicineTable?.ngOnInit()

          this.isLoading = false;

        });
    } else {
      console.log('please select a date');
    }
  }

  addMockData() {
    for (let i = 0; i < 15; i++) {
      const data = {
        address: `${i} floor, Buendia, Pasay Metro Manila`,
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


  async onClickActions(event: any) {
    this.isLoading = true;

    switch (event.action) {
      case 'delete':
        await this.firebaseService.removeData(event.id)
        this.message.success('Data deleted successfully');
        this.refresh();
        break;

      case 'update':
        this.router.navigate(['admin/manage/update-data', event.id]);
        break;
    }
  }
}
