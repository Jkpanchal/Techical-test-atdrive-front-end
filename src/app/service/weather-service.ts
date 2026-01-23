import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  BASE_URL = "https://api.weatherapi.com/v1"
  API_KEY = ""

  constructor(private http:HttpClient){}

  getWheatherData() {
    return this.http.get(`${this.BASE_URL}/current.json`,{params:{key:this.API_KEY, q:'Noida'}, observe:"response"})
  }
}
