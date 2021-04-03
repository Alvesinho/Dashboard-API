import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

resultats: any;

url="api.openweathermap.org/data/2.5/weather?q="
API="&appid=50a3d9069642e4b85379632ba2126c5a"

  constructor(
    private http:HttpClient
  ) { }


  getWeather = async (cityName: string) => {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=50a3d9069642e4b85379632ba2126c5a").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + this.resultats)
        console.log("2) MAIN " + this.resultats.main.temp)
        return (this.resultats);
      },
      err => console.log(err)
    )
  }
}
