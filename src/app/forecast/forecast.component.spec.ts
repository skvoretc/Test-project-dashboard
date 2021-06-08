import { APIService } from './../api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ForecastComponent } from './forecast.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let http:HttpClient
  let request:string;
  const fakeapi = {loadData: () => http.get(request)}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[MatIconRegistry,DomSanitizer,FormControl,HttpClient,HttpHandler,ForecastComponent,
      {provide:APIService,useValue:fakeapi}],
      declarations: [ ForecastComponent ]
    })
    .compileComponents();
    component = TestBed.inject(ForecastComponent)

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should load data', ()=> {
    expect(component.loadData(30.264168,59.894444,'17d184bc85712f6093531707ececd3aa')).toBeTruthy
  })
});
