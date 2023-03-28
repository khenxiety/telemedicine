import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit {

  @Output() isBackButtonOn:any= new EventEmitter<boolean>()

  constructor(    private breadcrumbsService: BreadcrumbService) { }

  ngOnInit(): void {
    this.isBackButtonOn.emit(true)
    
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Manage',
      childPage:'View Data'
    });
  }

}
