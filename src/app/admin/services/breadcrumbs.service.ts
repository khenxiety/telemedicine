import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsTitle = '';
  private breadcrumbsTitleSubject = new Subject<string>();

  setTitle(title: any) {
    this.breadcrumbsTitle = title;
    this.breadcrumbsTitleSubject.next(title);
  }

  getTitle() {
    return this.breadcrumbsTitleSubject.asObservable();
  }
}
