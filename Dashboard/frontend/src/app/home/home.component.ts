import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { WeatherComponent } from '../Widgets/weather/weather.component';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  CountWeather : number = 1;
  CountStock: number = 1;
  CountCorona: number = 1;
  CountNASA: number = 1;
  Counthth: number = 1;
  CountFoot: number = 1;
  CountGmail: number = 1;

  addWeather() {
    this.CountWeather = this.CountWeather + 1;
    console.log("Numbre de widget Weather : " + this.CountWeather);
  }

  delWeather() {
    this.CountWeather--;
    console.log("Numbre de widget Weather : " + this.CountWeather);
  }

  addStock() {
    this.CountStock = this.CountStock + 1;
    console.log("Numbre de widget Stock : " + this.CountStock);
  }

  delStock() {
    this.CountStock--;
    console.log("Numbre de widget Stock : " + this.CountStock);
  }

  addCorona() {
    this.CountCorona = this.CountCorona + 1;
    console.log("Numbre de widget Corona : " + this.CountCorona);
  }

  delCorona() {
    this.CountCorona--;
    console.log("Numbre de widget Corona : " + this.CountCorona);
  }

  addNASA() {
    this.CountNASA= this.CountNASA+ 1;
    console.log("Numbre de widget NASA : " + this.CountNASA);
  }

  delNASA() {
    this.CountNASA--;
    console.log("Numbre de widget NASA : " + this.CountNASA);
  }
  
  addsoccer() {
    this.CountFoot= this.CountFoot+ 1;
    console.log("Numbre de widget Foot : " + this.CountFoot);
  }

  delsoccer() {
    this.CountFoot--;
    console.log("Numbre de widget Foot : " + this.CountFoot);
  }

  addhth() {
    this.Counthth= this.Counthth+ 1;
    console.log("Numbre de widget HTH : " + this.Counthth);
  }

  delhth() {
    this.Counthth--;
    console.log("Numbre de widget HTH : " + this.Counthth);
  }

  addGmail() {
    this.CountGmail= this.CountGmail+ 1;
    console.log("Numbre de widget Gmail : " + this.CountGmail);
  }

  delGmail() {
    this.CountGmail--;
    console.log("Numbre de widget Gmail : " + this.CountGmail);
  }



  /** Based on the screen size, switch from standard to one column per row */  
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );
 
  constructor(private breakpointObserver: BreakpointObserver) {
  }
}