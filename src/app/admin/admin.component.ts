import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isCollapsed = false;

  year:number = new Date().getFullYear()
  constructor() {}

  ngOnInit(): void {}

  logout(): void {
    window.location.href = '/';
  }
}
