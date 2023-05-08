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
      link:'',
      use:['Position your index finger inside the device', 'Let the kit measure the oxygen saturation of the patient and wait until the process is over']
    },
    {
      title:'GUN THERMOMETER',
      description:'measures temperature from a distance without touching the surface being measured',
      image:'assets/gun thermo.png',
      link:'',
      use:['Put the thermometer close to the spot where temperature will be taken, like wrists or forehead','Keep a 5 cm space between the two, ideally','Gently press the trigger to take a temperature reading as indicated on the LCD panel','Let the kit measure the temperature of the patient and wait until the process is over']
    },
    {
      title:'ELECTROCARDIODIAGRAM',
      description:'records the electrical activity of the heart',
      image:'assets/cardiodiagram.png',
      link:'',
      use:['Make sure the patient is laying down comfortably','Place the red electrode to the patient’s right chest/arm, yellow electrode to left chest/arm, and the last electrode to the patient’s right waist/thigh, as shown in the image','Let the kit measure the electrical activity of the heart and wait until the process is over']
    },
    {
      title:'PNUEMOGRAPH',
      description:'measure the movement of air in and out of the lungs',
      image:'assets/newmo.png',
      link:'',
      use:['Make sure the patient is comfortable','Gently place the respiratory belt on the patient’s stomach, tying it tightly','Let the kit measure the breathing rate of the patient and wait until  the process is over']
    }
  ]
  isVisible = false;

  modalsData:any

  constructor() { }

  ngOnInit(): void {
  }

  showModal(data:any): void {
    this.isVisible = true;
    this.modalsData = data
    console.log(this.modalsData)
  }
  close(){
    this.modalsData={}
    this.isVisible = false;

  }

}
