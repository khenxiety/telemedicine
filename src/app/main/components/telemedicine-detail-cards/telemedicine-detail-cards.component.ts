import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemedicine-detail-cards',
  templateUrl: './telemedicine-detail-cards.component.html',
  styleUrls: ['./telemedicine-detail-cards.component.scss'],
})
export class TelemedicineDetailCardsComponent implements OnInit {
  @Input() imgURL: string = '';
  @Input() data: string = '';
  @Input() description: string = '';
  @Input() filled: boolean = false;
  @Input() isWideCard: boolean = false;
  @Input() heartEcg:any
  @Input() dataDate:any


  constructor() {}

  async ngOnInit() {

    
  }
  
  
}
