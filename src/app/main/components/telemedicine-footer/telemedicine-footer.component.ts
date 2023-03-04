import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemedicine-footer',
  templateUrl: './telemedicine-footer.component.html',
  styleUrls: ['./telemedicine-footer.component.scss'],
})
export class TelemedicineFooterComponent implements OnInit {
  year: string = new Date().getFullYear().toString();

  constructor() {}

  ngOnInit(): void {}
}
