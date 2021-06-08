import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { APIService } from '../api.service';

const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="196" height="196" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>`;
const cloud = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg>`;
const rain = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain-heavy" viewBox="0 0 16 16">
<path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1z"/>
</svg>`;
const semi_rain = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16">
<path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
</svg>`;
const semi_cloud =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
<path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
<path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
</svg>`

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  choosecitycontrol = new FormControl();
  Citylist = [
    {
      name: 'Saint-Petersburg',
      value: {
        name: 'Saint-Petersburg',
        lon: 30.264168,
        lat: 59.894444,
      }
    },
    {
      name: 'Moscow',
      value: {
        name: 'Moscow',
        lon: 37.606667,
        lat: 55.761665,
      }
    },
    {
      name: 'New York',
      value: {
        name: 'New York',
        lon: -74.005966,
        lat: 40.714272,
      }
    },
    {
      name: 'Paris',
      value: {
        name: 'Paris',
        lon: 2.3488,
        lat: 48.853409
      }
    },
    {
      name: 'Tokyo',
      value: {
        name: 'Tokyo',
        lon: 139.691711,
        lat: 35.689499
      }
    },

  ]
  currentdate: String = '13-05-2000';
  curCity = this.Citylist[0].value;
  //API data
  API = '17d184bc85712f6093531707ececd3aa';
  request:string ='';
  data:any;
  weather:any=[];
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private api: APIService
  ) {
    iconRegistry.addSvgIconLiteral(
      'sun',
      sanitizer.bypassSecurityTrustHtml(sun)
    );
    iconRegistry.addSvgIconLiteral(
      'cloud',
      sanitizer.bypassSecurityTrustHtml(cloud)
    );
    iconRegistry.addSvgIconLiteral(
      'rain',
      sanitizer.bypassSecurityTrustHtml(rain)
    );
    iconRegistry.addSvgIconLiteral(
      'semi_rain',
      sanitizer.bypassSecurityTrustHtml(semi_rain)
    );
    iconRegistry.addSvgIconLiteral(
      'semi_cloud',
      sanitizer.bypassSecurityTrustHtml(semi_cloud)
    );

  }

  ngOnInit(): void {
    this.choosecitycontrol.setValue(this.Citylist[0].value)
    this.loadData(this.choosecitycontrol.value.lat,this.choosecitycontrol.value.lon,this.API)
  }
  loadData(lat:number,lon:number, api: string){
    this.request = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=' +api+'&lang=ru'
    this.api.loaddata(this.request)
      .subscribe((response) => {
        this.data = response;
        this.weather = [];
        this.data.daily.map((day: { dt: number | undefined; temp: {day:number;night:number};weather:[{main:string,description:string}]})=>{
          let date = new Date(1970,0,0,0,0,day.dt)
          let curdate =(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +'-' +(date.getMonth() < 10  ? '0' + (date.getMonth() + 1)  : date.getMonth() + 1) +'-' +date.getFullYear()
          this.weather.push({day:curdate,day_temp:day.temp.day,night_temp:day.temp.night,weather:{main:day.weather[0].main,description:day.weather[0].description}})
        })
      });
  }
  changecity(){
this.loadData(this.choosecitycontrol.value.lat,this.choosecitycontrol.value.lon,this.API)
}
}
