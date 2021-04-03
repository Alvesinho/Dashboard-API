import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.css']
})
export class SoccerComponent implements OnInit {

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
      player: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async SubmitWeather() {
    const player = this.signinForm.get('player')?.value;
    this.stats = await this.getStats(player);
    console.log("3) Température " + this.stats)
  };

  getStats = async (player: string) => {
    this.http.get("https://apiv2.apifootball.com/?action=get_players&player_name="+ player +"&APIkey=b90b0007d01e580eaefa65cc74c98586137451c4a1418d5c53e08cb3b42a1cac").subscribe(
      (data) => {
        this.resultats = data;
        console.log("1) JSON" + this.resultats)
        console.log("2) MAIN " + JSON.stringify(this.resultats))
        this.displayTemp = true;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}
