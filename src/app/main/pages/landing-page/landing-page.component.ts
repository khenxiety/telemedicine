import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // inputText: string = '';
  // keywords: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  // generateRandomKeywords() {
  //   const inputArray = this.inputText.split(' ');

  //   this.keywords = [];

  //   for (let i = 0; i < 10; i++) {
  //     let keyword = '';
  //     inputArray.forEach((word) => {
  //       const randomIndex = Math.floor(Math.random() * word.length);
  //       keyword += word[randomIndex].toUpperCase() + word.slice(1);
  //     });
  //     this.keywords.push(keyword);
  //   }

  //   console.log(this.keywords);
  // }
}
