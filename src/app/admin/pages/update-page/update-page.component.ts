import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Helper } from 'src/app/helpers/helper.helper';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit,OnDestroy {

  private dataId:string =''
  public patientData:any

  private ubsubscribeData:any


  @Output() isBackButtonOn:any= new EventEmitter<boolean>()

  constructor(
    private breadcrumbsService: BreadcrumbService, 
    private router:Router, 
    private activatedRoute:ActivatedRoute,
    private firebaseService:FirebaseService
    ) {}

  async ngOnInit() {
    this.isBackButtonOn.emit(true)
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
      childPage:'View Data'
    });

    await this.activatedRoute.params.subscribe(res =>{
      this.dataId =  res['id']
    })
    this.getDataById()

  }

  ngOnDestroy(): void {
    this.ubsubscribeData.unsubscribe()
  }


  getDataById():void {

    this.ubsubscribeData = this.firebaseService.getSingleDataSnapshot(this.dataId)
    .pipe(
      catchError((err:any) =>{
        throw new Error(err)
      })
    ).subscribe(response =>{
      this.patientData = response.data
      console.log( this.patientData )
    })

    
  }

}
