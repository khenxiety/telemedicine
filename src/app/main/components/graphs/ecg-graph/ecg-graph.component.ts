import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ecg-graph',
  templateUrl: './ecg-graph.component.html',
  styleUrls: ['./ecg-graph.component.scss']
})
export class EcgGraphComponent implements OnInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  public xAxisStripLinesArray = [];
  public yAxisStripLinesArray = [];
  public dps = [];
  @Input() ecg:any
  @Input() date:any


  chartOptions:any ={
    theme: "light2",
    title:{
      text:"Heart ECG",
      horizontalAlign: "left",
      fontColor: "black"
    },
    subtitles:[{
      text: '' ,
      horizontalAlign: "left",
    }],
    axisY:{
      title:'Amplitude',
      stripLines: [],
      gridColor: "gray",
      lineColor: "red",
      tickThickness: 0,
      labelFormatter: function(e:any){
        return "";
      }
    },
    axisX:{
      title:'Time',
      stripLines:[],
      gridColor: "gray",
      lineColor: "red",
       tickThickness: 0,
      labelFormatter: function(e:any){
        return "";
      }
    },
    data: [
      {
        type: "spline",
        color:"black",
        dataPoints: []
      }
    ]
  };
  constructor() { }

  ngOnInit() {

    this.chartOptions.subtitles[0].text = `Date ${ new Date(this.date).toLocaleString() }`
    this.addDataPoints()

  }
  addDataPoints() {
    const dps = [];
    for (let i = 0; i < this.ecg.length; i++) {
      dps.push({y: Number(this.ecg[i])});
    }
    this.chartOptions.data[0].dataPoints = dps;
    
  }
  
}
