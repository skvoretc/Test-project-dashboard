import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,HttpHandler]
    });
    http = TestBed.get(HttpClient)
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return api'), ()=> {
    service.loaddata('https://api.openweathermap.org/data/2.5/forecast?id=498817&type=like&units=metric&appid=17d184bc85712f6093531707ececd3aa&lang=ru'
    ).subscribe((response) => {
      expect(response).not.toBeUndefined()
    })
  }
});
