import { Component, OnInit,HostListener } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-telemedicine-header',
  templateUrl: './telemedicine-header.component.html',
  styleUrls: ['./telemedicine-header.component.scss'],
})
export class TelemedicineHeaderComponent implements OnInit {
  currentRoute: string = '';
  headerElement: Array<any> = [
    {
      title: 'home',
      route: '/search',
      icon: 'home',
      fill: 'fill',
    },
    {
      title: 'about us',
      route: '/none',
      icon: 'info-circle',
      fill: 'fill',
    },
    {
      title: 'features',
      route: '/none',
      icon: 'appstore',
      fill: 'fill',
    },
    {
      title: 'contact',
      route: '/none',
      icon: 'phone',
      fill: 'fill',
    },
    {
      title: 'login',
      route: '/login',
      icon: 'login',
      fill: 'outline',
    },
  ];
  public isMobileView: boolean = false;
  public navScroll: boolean = false;
  constructor(private router: Router,private auth:Auth) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
    
    
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 100) {
      this.navScroll = true;
    } else {
      this.navScroll = false;
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

  ngOnInit(): void {
    console.log(this.currentRoute);
    this.isMobileView = window.innerWidth < 767;
  //   if(this.auth.currentUser == null){
  //     this.headerElement = [
        
  //       {
  //         title: 'about us',
  //         route: '/none',
  //         icon: 'info-circle',
  //         fill: 'fill',
  //       },
  //       {
  //         title: 'features',
  //         route: '/none',
  //         icon: 'appstore',
  //         fill: 'fill',
  //       },
  //       {
  //         title: 'contact',
  //         route: '/none',
  //         icon: 'phone',
  //         fill: 'fill',
  //       },
  //       {
  //         title: 'login',
  //         route: '/login',
  //         icon: 'login',
  //         fill: 'outline',
  //       },
  //     ]
  // }else{
    
  // }
  }
}
