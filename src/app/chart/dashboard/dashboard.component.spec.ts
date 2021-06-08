import { APIService } from './../../api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import * as Highcharts from 'highcharts';

import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormsModule, Highcharts, APIService],
      declarations: [DashboardComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.curchart = { temp: true, feel: false, min_temp: false, pressure: false };
    fixture.detectChanges();

  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
