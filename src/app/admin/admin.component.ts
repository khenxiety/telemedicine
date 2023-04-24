import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumbs.service';
import { LocalstorageService } from '../services/localstorage/localstorage.service';
import { UserAuthService } from '../services/registration.service';

import { NzMessageService } from 'ng-zorro-antd/message';
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
  public isMobileView: boolean = false;
  constructor(
    public breadcrumbService: BreadcrumbService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localStorageService:LocalstorageService,
    private message:NzMessageService,
    private auth:UserAuthService
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

  async ngOnInit() {
    this.isMobileView = window.innerWidth < 767;
    const userData =await this.localStorageService.getItem('user')
    if(userData){
      if(userData.type !=='admin'){
        this.message.error(`You don't have permission to visit this page, please contact the admin`)
        this.router.navigate(['/search'])
      }
    }
  }

  async logout(){
    try {
      await this.auth.userLogout()
      this.router.navigate(['/login'])
    } catch (error:any) {
      this.message.error(error.toString())
    }
    
  }
  @HostListener('window: resize', ['$event.target'])
  public onResize(eventTarget: EventTarget): void {
    if ((<Window>eventTarget).innerWidth < 767) {
      if (!this.isMobileView) {
        this.isMobileView = true;
      }
    }
    if ((<Window>eventTarget).innerWidth >= 767) {
      if (this.isMobileView) {
        this.isMobileView = false;
      }
    }
    console.log((<Window>eventTarget).innerWidth);
  }
}
