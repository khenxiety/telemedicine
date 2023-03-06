import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumbs.service';
interface RouteData {
  [key: string]: any;
  isScrolling: boolean;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  breadcrumbsTitle: any;
  year: number = new Date().getFullYear();

  public isScrolling: boolean = false;
  constructor(
    public breadcrumbService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.breadcrumbService.getTitle().subscribe((title: any) => {
      this.breadcrumbsTitle = title;
      this.changeDetectorRef.detectChanges();
    });
  }

  @HostListener('scroll', ['$event']) onscroll(event: any) {
    const container = this.elementRef.nativeElement;
    const scrollPosition = container.scrollTop;
    if (window.scrollY > 10) {
      this.isScrolling = true;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.activatedRoute.children.forEach((child) => {
            const data = child.snapshot.data as RouteData;
            data.isScrolling = this.isScrolling;
          });
        }
      });
    } else {
      this.isScrolling = false;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.activatedRoute.children.forEach((child) => {
            const data = child.snapshot.data as RouteData;
            data.isScrolling = this.isScrolling;
          });
        }
      });
    }
  }

  ngOnInit(): void {}

  logout(): void {
    window.location.href = '/';
  }
}
