import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.css']
})
export class NasaComponent implements OnInit {

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
      NASA: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  async SubmitWeather() {
    const NASA = this.signinForm.get('NASA')?.value;
    this.stats = await this.getStats(NASA);
  };

  getStats = async (NASA: string) => {
    this.http.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol="+ NASA + "&api_key=xbfdFfyWuA2Vxg7p9aO6FO0xg1smb6uWAbEcsSJi").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + JSON.stringify(this.resultats.photos[0].camera[0]))
        console.log("2) CAM" + JSON.stringify(this.resultats.photos[0].img_src))
        console.log("2) MAIN " + JSON.stringify(this.resultats.photos[0]))
        this.displayTemp = true;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}
