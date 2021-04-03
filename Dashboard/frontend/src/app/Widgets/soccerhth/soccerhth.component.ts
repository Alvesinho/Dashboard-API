import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soccerhth',
  templateUrl: './soccerhth.component.html',
  styleUrls: ['./soccerhth.component.css']
})
export class SoccerhthComponent implements OnInit {

  signinForm: FormGroup;
  stats: any;
  resultats: any;
  displayTemp = false;
  url="api.openweathermap.org/data/2.5/weather?q="
  API="b90b0007d01e580eaefa65cc74c98586137451c4a1418d5c53e08cb3b42a1cac"


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
      TEAM1: ['', [Validators.required, Validators.minLength(3)]],
      TEAM2: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async SubmitWeather() {
    const TEAM1 = this.signinForm.get('TEAM1')?.value;
    const TEAM2 = this.signinForm.get('TEAM2')?.value;
    this.stats = await this.getHtH(TEAM1, TEAM2);
    console.log("3) Température " + this.stats)
  };

  getHtH = async (TEAM1: string, TEAM2: string) => {
    this.http.get("https://apiv2.apifootball.com/?action=get_H2H&firstTeam="+ TEAM1 +"&secondTeam="+ TEAM2 +"&APIkey=b90b0007d01e580eaefa65cc74c98586137451c4a1418d5c53e08cb3b42a1cac").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + this.resultats)
        console.log("2) MAIN " + JSON.stringify(this.resultats))
        console.log("4) MAIN " + this.resultats.firstTeam_VS_secondTeam[0])
        this.displayTemp = true;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}
