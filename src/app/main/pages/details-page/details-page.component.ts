import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd/i18n';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getISOWeek } from 'date-fns';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  public activeData: string = '-NP_vubOnDCJElUtmNZh';
  public data: any;
  date = null;
  isEnglish = false;
  constructor(
    private firebaseService: FirebaseService,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .getSingleDataSnapshot(this.activeData)
      .subscribe((res) => {
        console.log(res);
        this.data = res.data;
      });

    this.firebaseService.getDataRealtime().subscribe((res) => {
      console.log('snap', res);
    });
    // const dbInstance = ref(this.db, 'data/');
    // onValue(dbInstance, (snapshot) => {
    //   return snapshot.val();
    //   // console.log(snapshot.val());

    //   // for (let i in snapshot.val()) {
    //   //   this.test.push({ id: i, ...snapshot.val()[i] });
    //   // }
    //   // console.log(this.test);
    // });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
