import { Component, OnInit, HostListener } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import { RefreshService } from 'src/app/services/common/refresh.service';
import { UserAuthService } from 'src/app/services/registration.service';
@Component({
  selector: 'app-telemedicine-header',
  templateUrl: './telemedicine-header.component.html',
  styleUrls: ['./telemedicine-header.component.scss'],
})
export class TelemedicineHeaderComponent implements OnInit {
  currentRoute: string = '';
  public isLoggedIn: boolean = true;
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
      route: '/contact',
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
  constructor(
    private router: Router,
    private auth: Auth,
    private refresherService: RefreshService,
    private authenticationService: UserAuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.refresherService.refresh.subscribe((res) => {
      this.ngOnInit();
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
    console.log('refreshed');
    console.log(this.auth.currentUser);
    this.isMobileView = window.innerWidth < 767;
    if (this.auth.currentUser != null) {
      this.setIsUserLoggedIn();
    } else {
      this.headerElement = [
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
          route: '/contact',
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
    }
  }

  setIsUserLoggedIn(): void {
    this.headerElement = [
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
        route: '/contact',
        icon: 'phone',
        fill: 'fill',
      },
      {
        title: 'logout',
        route: 'logout',
        icon: 'phone',
        fill: 'fill',
      },
    ];

    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  async menuAction(action: string): Promise<any> {
    if (action === 'logout') {
      console.log('logged out');

      try {
        const logout = await this.authenticationService.userLogout();
        this.router.navigate(['/login']);
        this.ngOnInit();
        console.log(logout);
      } catch (error) {
        console.error(error);
      }

      return;
    }

    this.router.navigate([action]);
  }
}
