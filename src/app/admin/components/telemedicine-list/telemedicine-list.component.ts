import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter,HostListener } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, of } from 'rxjs';
const count = 5;
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
@Component({
  selector: 'app-telemedicine-list',
  templateUrl: './telemedicine-list.component.html',
  styleUrls: ['./telemedicine-list.component.scss'],
})
export class TelemedicineListComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  @Input() dataItems: any[] = [];
  @Input() isSpinning: boolean = false;

  @Output() actions: any = new EventEmitter();

  public isMobileView:boolean = false

  constructor(private http: HttpClient, private msg: NzMessageService) {}
  ngOnInit(): void {
    this.isMobileView = window.innerWidth < 767;

    this.getData((res: any) => {
      this.data = res.results;
      this.list = res.results;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http
      .get(fakeDataUrl)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat(
      [...Array(count)].fill({}).map(() => ({ loading: true, name: {} }))
    );
    this.http
      .get(fakeDataUrl)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => {
        this.data = this.data.concat(res.results);
        this.list = [...this.data];
        this.loadingMore = false;
      });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }

  emitActions(data: any) {
    this.actions.emit(data);
  }

  cancel() {}


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
