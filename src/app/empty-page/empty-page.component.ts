import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss'],
})
export class EmptyPageComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  back() {
    this.location.back();
  }
}
