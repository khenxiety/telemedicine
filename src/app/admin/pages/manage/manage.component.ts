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
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SessionStorage } from 'src/app/enums/enums';
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
  providers:[DatePipe]
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

  public testData:any[]=[]
  public isMobileView: boolean = false;


  constructor(
    private firebaseService: FirebaseService,
    private message: NzMessageService,
    private breadcrumbsService: BreadcrumbService,
    private router: Router,
    private httpClient:HttpClient,
    private datePipe: DatePipe
  ) { }

  async ngOnInit() {
    this.isMobileView = window.innerWidth < 767;
    if(this.isMobileView){
      this.tableView = false
    }

    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
    });
    this.loadData();
    // this.route.data.subscribe((res) => {
    //   console.log(res);
    // });
    // this.getRandomData()

  }

  switchView() {
    this.tableView = !this.tableView
  }

  getRandomData(){ //to delete
    const getData = this.httpClient.get('https://randomuser.me/api/?results=20')
    getData.subscribe((res:any) =>{
      res.results.map( (data:any , i:any) =>{
        this.testData.push({

          address: `${data.location.street.number} ${data.location.street.name}, ${data.location.city} `,
          age: data.dob.age,
          birthdate: this.datePipe.transform(data.dob.date , 'dd/MM/yyyy hh:mm a'),
          breathRate: '23/2',
          contactNumber: data.phone,
          registrationDate: data.registered.date,
          ecg:'',
          gender: data.gender,
          heartRate: 23,
          height: 34,
          image: data.picture.large,
          name: `${data.name.first} ${data.name.last}`,
          oxygenSaturation: 'bohai2',
          temperature: 34,
          weight: 34,
          lastModified:'',
          date:new Date(data.registered.date).toISOString().slice(0,10)
        })
      } )
      this.addMockData();
    })
  }

  addMockData() {
    this.testData.forEach(res =>{
      this.firebaseService.addData(res).then((res) => {
        console.log(res, 'success');
      });
    })
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
    const check = sessionStorage.getItem(SessionStorage.Data);
    if (check && !reload) {
      this.data = JSON.parse(check);
      this.setColumns(this.data);
      this.isLoading = false;
    } else {
      this.firebaseService.getDataRealtime().subscribe((res) => {
        this.data = Helper.toArrayObjects(res);
        sessionStorage.setItem(SessionStorage.Data, JSON.stringify(this.data));
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
    sessionStorage.removeItem(SessionStorage.Data);
    this.date = []
    this.loadData(true);
    this.telemedicineTable?.ngOnInit()

    // this.telemedicineTable?.ngOnInit()
  }

  public datePick(event: any): void {
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
      this.message.info('Please select a date')
    }
  }




  async onClickActions(event: any) {
    this.isLoading = true;

    switch (event.action) {
      case 'delete':
        await this.firebaseService.removeData(event.id.replace('-',''))
        this.message.success('Data deleted successfully');
        this.refresh();
        break;

      case 'update':
        this.router.navigate(['admin/manage/update-data', event.id.replace('-' ,'')]);
        break;
    }
  }


  public onResize(eventTarget: EventTarget): void {
    if ((<Window>eventTarget).innerWidth < 767) {
      if (!this.isMobileView) {
        this.isMobileView = true;
        this.tableView = false
      }
    }
    if ((<Window>eventTarget).innerWidth >= 767) {
      if (this.isMobileView) {
        this.isMobileView = false;
        this.tableView = true

      }
    }
    console.log((<Window>eventTarget).innerWidth);
  }

  test(){
    const model = {
      address:'test',
      age: 'test',
      birthdate: 'test',
      breathRate: 'test',
      contactNumber: 'test',
      registrationDate: 'test',
      ecg: 'test',
      gender: 'test',
      heartRate: 'test',
      height: 'test',
      image: 'test',
      name: 'test',
      oxygenSaturation: 'test',
      temperature: 'test',
      weight: 'test',
      lastModified: 'test',
      date: 'test',
    }
    const model2 = {
      name: 'test',
      address:'test',
      age: 'test',
      records:[
        {
          birthdate: 'test',
          breathRate: 'test',
          contactNumber: 'test',
          registrationDate: 'test',
          ecg: 'test',
          gender: 'test',
          heartRate: 'test',
          height: 'test',
          image: 'test',
          oxygenSaturation: 'test',
          temperature: 'test',
          weight: 'test',
          lastModified: 'test',
          date: 'test',
        },
        {
          birthdate: 'test',
          breathRate: 'test',
          contactNumber: 'test',
          registrationDate: 'test',
          ecg: 'test',
          gender: 'test',
          heartRate: 'test',
          height: 'test',
          image: 'test',
          oxygenSaturation: 'test',
          temperature: 'test',
          weight: 'test',
          lastModified: 'test',
          date: 'test',
        },
      ]
      
    }
  }
}
