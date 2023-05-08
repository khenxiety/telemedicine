import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { Router } from '@angular/router';
import { Helper } from 'src/app/helpers/helper.helper';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { EmailjsService } from 'src/app/services/emailjs.service';
import { UserAuthService } from 'src/app/services/registration.service';
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
  email: string;
  type: string;
}
@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {

  public data:any[]=[]
  public listOfColumns: ColumnItem[] = [];

  public isLoading:boolean = false

  constructor(private firebaseService: FirebaseService,
    private message: NzMessageService,
    private breadcrumbsService: BreadcrumbService,
    private emailService:EmailjsService,
    private registration:UserAuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage Accounts',
    });
    this.getAccounts()
  }
  
  private getAccounts():any{
    this.isLoading= true

    this.firebaseService.getAccountsRealtime().subscribe({
      next:(res:any) =>{
        this.data = Helper.toArrayObjects(res)
        this.setColumns(this.data)
        setTimeout(() => {
          this.isLoading= false
        }, 800);
      },
      error:(error) =>{
        throw error
      },
      complete: ()=>{
         this.isLoading= false
      }
    })
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
        name: 'Email',
        sortOrder: null,
        sortFn: null,
        sortDirections: [null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
      },
      {
        name: 'Type',
        sortOrder: null,
        sortDirections: ['ascend', 'descend', null],
        sortFn: (a: DataItem, b: DataItem) =>
          a.type.length - b.type.length,
        filterMultiple: false,
        listOfFilter: data.map((res: DataItem) => {
          return { text: res.type, value: res.type };
        }),
        filterFn: (type: string, item: DataItem) =>
          item.type.indexOf(type) !== -1,
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

  async onClickActions(event: any) {
    switch (event.action) {
      case 'account-approve':
        this.accountApproved(event.id)
        break;
      case 'delete':
        window.location.href = 'https://console.firebase.google.com/u/0/project/telemedicine-3ca8d/authentication/users'
        break;
    }
  }

  async accountApproved(data:any){
    try {
      const register = await this.registration.userSignup(data)
      if (register.status === 200) {
        this.sendEmail(data.email)
        this.message.success('Account approved');
      }
    } catch (error:any) {
      this.message.error(error);
      throw error
    }
  }

  async sendEmail(email:any){
    try {
      this.isLoading = true;
      const data = {
        subject: "Account Registration Approved",
        message:"Your account registration has been approved. You can now use you account credentials to login on Telemedicine App.",
        to_email:email
      }
      const emailResponse = await this.emailService.sendEmailAccountApproval(data)
      if(emailResponse.status == 200){
        this.message.success('Email has been sent');
      }
    } catch (error) {
      console.error(error)
    }finally{
      this.isLoading = false;
    }
  }
}
