import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TelemedicineTableComponent } from '../../components/telemedicine-table/telemedicine-table.component';
import { BreadcrumbService } from '../../services/breadcrumbs.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(TelemedicineTableComponent) telemedicineTable:
    | TelemedicineTableComponent
    | undefined;

  data: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbsService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.setTitle({
      relative: 'Dashboard',
      page: 'Analytics',
    });
  }
}
