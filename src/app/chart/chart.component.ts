import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  firstchart = { temp: true, feel: false, min_temp: false, pressure: false };
  secondchart = { temp: false, feel: false, min_temp: true, pressure: false };
  thirdchart = { temp: false, feel: true, min_temp: false, pressure: false };
  fourthchart = { temp: false, feel: false, min_temp: false, pressure: true };

  chartsselect = new FormControl();
  chartsList: string[] = [
    'First chart',
    'Second chart',
    'Third chart',
    'Fourth chart',

  ];
  smthng: any = this.chartsList;

  constructor() {
    console.log(this.chartsselect);
  }
  change() {
    if (this.chartsselect.value.includes(this.chartsList[0])) {
      console.log(this.smthng);
    }
  }
}
