import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-telemedicine-input',
  templateUrl: './telemedicine-input.component.html',
  styleUrls: ['./telemedicine-input.component.scss']
})
export class TelemedicineInputComponent implements OnInit {

  @Input() public placeholder:string =''
  @Input() public formGroupParent:FormGroup =new FormGroup({})

  @Input() public controlName:string =''
  @Input() public errorMessage:string =''
  @Input() public icon:string =''
  @Input() public type:string =''
  @Input() public isRound:boolean = false




  constructor() { }

  ngOnInit(): void {
  }

}
