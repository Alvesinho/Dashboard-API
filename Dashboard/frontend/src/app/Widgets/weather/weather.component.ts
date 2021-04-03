import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../Widgets-service/weather.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  signinForm: FormGroup;
  weather: any;
  testing = "On est bon";
  resultats: any;
  displayTemp = false;
  fahrenheit: any;
  url="api.openweathermap.org/data/2.5/weather?q="
  API="&appid=50a3d9069642e4b85379632ba2126c5a"


  constructor(
    private WeatherService: WeatherService,
    private formBuilder: FormBuilder,
    private http:HttpClient
    ) { 
  }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async SubmitWeather() {
    const cityName = this.signinForm.get('cityName')?.value;
    this.weather = await this.getWeather(cityName);
    console.log("3) Température " + this.weather)
  };

  getWeather = async (cityName: string) => {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=50a3d9069642e4b85379632ba2126c5a").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + this.resultats)
        console.log("2) MAIN " + this.resultats.main.temp)
        this.displayTemp = true;
        this.fahrenheit = (this.resultats.main.temp * (9/5)) + 32;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}
