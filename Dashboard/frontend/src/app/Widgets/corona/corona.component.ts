import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-corona',
  templateUrl: './corona.component.html',
  styleUrls: ['./corona.component.css']
})
export class CoronaComponent implements OnInit {

  signinForm: FormGroup;
  stats: any;
  resultats: any;
  displayTemp = false;
  url="api.openweathermap.org/data/2.5/weather?q="
  API="&appid=50a3d9069642e4b85379632ba2126c5a"


  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient
    ) { 
  }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      country: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async SubmitWeather() {
    const country = this.signinForm.get('country')?.value;
    this.stats = await this.getStats(country);
    console.log("3) Température " + this.stats)
  };

  getStats = async (country: string) => {
    this.http.get("https://api.covid19api.com/total/country/"+country+"").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + this.resultats)
        console.log("2) MAIN " + this.resultats[337].Deaths)
        this.displayTemp = true;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}
