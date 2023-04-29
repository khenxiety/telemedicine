import { Component, OnInit, HostListener } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RefreshService } from 'src/app/services/common/refresh.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { UserAuthService } from 'src/app/services/registration.service';
@Component({
  selector: 'app-telemedicine-header',
  templateUrl: './telemedicine-header.component.html',
  styleUrls: ['./telemedicine-header.component.scss'],
  providers:[NzMessageService]
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
      route: '/about-us',
      icon: 'appstore',
      fill: 'fill',
    },
    {
      title: 'contact',
      route: '/features',
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
    private authenticationService: UserAuthService,
    private localStorageService:LocalstorageService,
    private message:NzMessageService
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
  }

  async ngOnInit() {
    this.isMobileView = window.innerWidth < 767;
    const getUser = await this.localStorageService.getItem('user')
    if (getUser) {
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
          route: '/about-us',
          icon: 'info-circle',
          fill: 'fill',
        },
        {
          title: 'features',
          route: '/features',
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
        route: '/about-us',
        icon: 'info-circle',
        fill: 'fill',
      },
      {
        title: 'features',
        route: '/features',
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

  async menuAction(action: string){
    window.scroll({
      top:0
    })
    
    if (action === 'logout') {
      try {
        const logout = await this.authenticationService.userLogout();
        this.message.success('Logged out successfully');
        this.router.navigate(['/login']);
        this.ngOnInit();
      } catch (error) {
        console.error(error);
      }
      return;
    }
    

    this.router.navigate([action]);
  }
}
