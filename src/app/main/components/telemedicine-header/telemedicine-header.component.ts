import { Component, OnInit,HostListener } from '@angular/core';
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
    },
    {
      title: 'about us',
      route: '/none',
    },
    {
      title: 'features',
      route: '/none',
    },
    {
      title: 'contact',
      route: '/none',
    },
    {
      title: 'login',
      route: '/login',
    },
  ];

  public navScroll:boolean = false
  constructor(private router: Router) {
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

  ngOnInit(): void {
    console.log(this.currentRoute);
  }
}
