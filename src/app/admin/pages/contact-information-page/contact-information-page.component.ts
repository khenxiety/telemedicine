import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
@Component({
  selector: 'app-contact-information-page',
  templateUrl: './contact-information-page.component.html',
  styleUrls: ['./contact-information-page.component.scss'],
})
export class ContactInformationPageComponent implements OnInit {
  constructor(private breadcrumbsService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'CMS',
      page: 'Manage Contact Info',
    });
  }
}
