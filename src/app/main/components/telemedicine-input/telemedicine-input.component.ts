import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemedicine-input',
  templateUrl: './telemedicine-input.component.html',
  styleUrls: ['./telemedicine-input.component.scss']
})
export class TelemedicineInputComponent implements OnInit {

  @Input() public placeholder:string =''
  @Input() public formControlName:string =''
  @Input() public errorMessage:string =''
  @Input() public icon:string =''
  @Input() public type:string =''
  @Input() public isRound:boolean = false




  constructor() { }

  ngOnInit(): void {
  }

}
