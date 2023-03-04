import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-telemedicine-text-area',
  templateUrl: './telemedicine-text-area.component.html',
  styleUrls: ['./telemedicine-text-area.component.scss']
})
export class TelemedicineTextAreaComponent implements OnInit {
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
