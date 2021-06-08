import { APIService } from './api.service';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatButtonModule} from '@angular/material/button';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './chart/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DashboardComponent,
    ForecastComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    MatButtonModule,
    HttpClientModule,
    HighchartsChartModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: 'dashboard', component: ChartComponent},
      {path: 'forecast', component: ForecastComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]),

  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    APIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
