import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-telemedicine-admin-input',
  templateUrl: './telemedicine-admin-input.component.html',
  styleUrls: ['./telemedicine-admin-input.component.scss'],
})
export class TelemedicineAdminInputComponent implements OnInit {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  @Input() public formControlName: string = '';
  @Input() public errorMessage: string = '';
  @Input() public icon: string = '';
  @Input() public type: string = '';
  @Input() public isRound: boolean = false;
  @Input() public disabled: boolean = false;

  @Input() public value: any = '';

  constructor() {}

  ngOnInit(): void {}
}
