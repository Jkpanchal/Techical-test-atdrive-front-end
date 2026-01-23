import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather-service';

@Component({
  selector: 'app-weather-modal',
  imports: [],
  templateUrl: './weather-modal.html',
  styleUrl: './weather-modal.css',
})
export class WeatherModal implements OnInit {
  constructor(private weatherService:WeatherService){}
  
  weatherData?: any | null;
  ngOnInit(): void {
    this.getWeatherData()
  }

  getWeatherData(){
    this.weatherService.getWheatherData().subscribe((Response)=>{
      let response:any = Response.body
      if(response?.error){
        alert("Unable to load weather API call")
      }
      console.log('response: ', response);
      this.weatherData = response
    })
  }
}
