import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {


  public features:any[] = [
    {
      title:'PULSE OXIMETER',
      description:'measures the saturation of oxygen carried in your red blood cells',
      image:'assets/oximeter.png',
      link:''
    },
    {
      title:'GUN THERMOMETER',
      description:'measures the saturation of oxygen carried in your red blood cells',
      image:'assets/gun thermo.png',
      link:''
    },
    {
      title:'ELECTROCARDIODIAGRAM',
      description:'measures the saturation of oxygen carried in your red blood cells',
      image:'assets/cardiodiagram.png',
      link:''
    },
    {
      title:'SPHYGMOMANOMETER',
      description:'measures the saturation of oxygen carried in your red blood cells',
      image:'assets/sphygmoma.png',
      link:''
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
