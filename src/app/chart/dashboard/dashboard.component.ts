import { APIService } from './../../api.service';
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  chartselect!: FormGroup;
  @Input() curchart: any;
  @Input() title: any;
  charttype: string[] = [
    'Temperature',
    'Feels like',
    'Minimal temperature',
    'Pressure',
  ];
  colors = [
    { name: 'LightSalmon', code: 'LightSalmon' },
    { name: 'MediumPurple', code: 'MediumPurple' },
    { name: 'SpringGreen', code: 'SpringGreen' },
    { name: 'DodgerBlue', code: 'DodgerBlue' },
    { name: 'DimGray', code: 'DimGray' },
  ];
  tempcolor: string = this.colors[0].code;
  min_tempcolor: string = this.colors[1].code;
  feelcolor: string = this.colors[2].code;
  pressurecolor: string = this.colors[3].code;
  //dataarrays
  data: any;
  chartdata: any = [];
  feeldata: any = [];
  maxdata: any = [];
  mindata: any = [];

  //API data
  API = '17d184bc85712f6093531707ececd3aa';
  CityId = 498817;
  request = 'https://api.openweathermap.org/data/2.5/forecast?id='+this.CityId +'&type=like&units=metric&appid='+this.API +'&lang=ru';
  //for chart
  curtype = 'line';
  highcharts: typeof Highcharts = Highcharts;
  chartRef!: Highcharts.Chart;
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };
  updateflag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      marginRight: 10,
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      uniqueNames: true,
      labels: {
        step: 2,
        format: '{value:%d-%m-%Y}',
      },
    },
    yAxis: [
      {
        title: {
          text: 'Temperature',
        },
        labels: {
          format: '{text}°',
        },

        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080',
          },
        ],
        tickInterval: 2,
      },
      {
        title: {
          offset: 0,
          text: 'Pressure',
          align: 'high',
          rotation: 0,
          textAlign: 'left',
          x: -60,
        },
        labels: {
          x: -30,
          format: '{text}',
        },
        showLastLabel: false,

        opposite: true,
      },
    ],
    series:[{
      type: 'column'
    }],
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: '<b>{point.point.data}</b><br>',
    },
    legend: {
      enabled: true,
    },
  };

  constructor( fb: FormBuilder, private api: APIService) {
    this.chartselect = fb.group({
      temp: new FormControl(),
      feel: new FormControl(),
      min_temp: new FormControl(),
      pressure: new FormControl(),
    });
    this.loaddata();

  }

  loaddata() {
        this.api.loaddata(this.request).subscribe((response) => {
        this.data = response;
        this.data.list.forEach(
          (element: {
            dt_txt: any;
            dt: any;
            main: { temp_min: any; pressure: any; temp: any; feels_like: any };
          }) => {
            let date = new Date(element.dt_txt);
            let curdate =
              (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
              '-' +
              (date.getMonth() < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) +
              '-' +
              date.getFullYear() +
              ' ' +
              date.getHours() +
              ':00';
            this.chartdata.push({
              x: date,
              y: element.main.temp,
              data: curdate,
            });
            this.feeldata.push({
              x: date,
              y: element.main.feels_like,
              data: curdate,
            });
            this.mindata.push({
              x: date,
              y: element.main.temp_min,
              data: curdate,
            });
            this.maxdata.push({
              x: date,
              y: element.main.pressure - 255,
              data: curdate,
            });
          }
        );
        this.addseries('bar');
      });
  }

  change_type() {
    this.curtype = this.curtype == 'bar' ? 'line' : 'bar';
    this.addseries(this.curtype);
  }
  changeseries() {
    this.addseries(this.curtype);
  }

  addseries(type: String) {
    for (let i = this.chartRef.series.length - 1; i >= 0; i--) {
      this.chartRef.series[i].remove();
    }
    if(this.chartOptions.series?.length){
      this.chartOptions.series[0] = {
        type: 'column'
      }

    }
      this.chartRef.update({
      title:{
        text: this.title
      }
    })
    if (this.chartselect.value.temp) {
        this.chartRef.addSeries({
          color: this.tempcolor,
          name: 'Temperature',
          type: this.curtype as any,
          data: this.chartdata,
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">\u25CF</span> ' +
              '{series.name}: <b>{point.y}°C</b><br/>',
          },
        });
    }
    if (this.chartselect.value.feel) {
      this.chartRef.addSeries({
        color: this.feelcolor,
        name: 'Feels like',
        type: this.curtype as any,
        data: this.feeldata,
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            '{series.name}: <b>{point.y}°C</b><br/>',
        },
      });
    }
    if (this.chartselect.value.min_temp) {
      this.chartRef.addSeries({
        color: this.min_tempcolor,
        name: 'Minimal temperature',
        type: this.curtype as any,
        data: this.mindata,
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            '{series.name}: <b>{point.y}°C</b><br/>',
        },
      });
    }
    if (this.chartselect.value.pressure) {
      this.chartRef.update({
        yAxis: [
          {
            title: {
              text: '',
            },
          },
          {
            title: {
              text: 'Pressure',
            },
            opposite: false,
          },
        ],
      });
      this.chartRef.addSeries({
        color: this.pressurecolor,
        name: 'Pressure',
        type: this.curtype as any,
        data: this.maxdata,
        yAxis: 1,
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> ' +
            '{series.name}: <b>{point.y}mm</b><br/>',
        },
      });
    }
    if (!this.chartselect.value.pressure) {
      this.chartRef.update({
        yAxis: [
          {
            title: {
              text: 'Temperature',
            },
          },
          {
            title: {
              text: '',
            },
          },
        ],
      });
    }
    if (
      this.chartselect.value.pressure &&
      (this.chartselect.value.temp ||
        this.chartselect.value.min_temp ||
        this.chartselect.value.feel)
    ) {
      this.chartRef.update({
        yAxis: [
          {
            title: {
              text: 'Temperature',
            },
          },
          {
            title: {
              text: 'Pressure',
            },
            opposite: true,
          },
        ],
      });
    }
  }
}
