import { Component, OnInit } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  config: CountdownConfig = {
    demand: false,
    leftTime: 60,
    stopTime: 0,
    format: 'mm:ss',
    prettyText: undefined,
    notify: 1,
    timezone: "-0500"
  };

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(event: any) {}

}
