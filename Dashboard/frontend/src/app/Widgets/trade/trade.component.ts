import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  signinForm: FormGroup;
  value: any;
  testing = "On est bon";
  resultats: any;
  displayTemp = false;
  Bid = "8. Bid Price"
  Ask = "9. Ask Price"
  Parse: any;
  Parse2: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private mat:MatTableModule,
    ) { 
  }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      DEVISE1: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async SubmitFX() {
    const DEVISE1 = this.signinForm.get('DEVISE1')?.value;
    this.value = await this.getFX(DEVISE1);
    console.log("3) Température " + this.value)
  };

  getFX = async (DEVISE1: string) => {
    this.http.get("http://api.marketstack.com/v1/eod?access_key=3326a2ff75d7ab309ed28bc0cde71db1&symbols="+ DEVISE1 +"").subscribe(
      (data) => {
        this.resultats = data;
        this.Parse = JSON.stringify(this.resultats);
        console.log("2) PARSE" + this.Parse)
        console.log("1) JSON" + JSON.stringify(this.resultats.data[0]))
        this.displayTemp = true;
        return (this.resultats);
      },
      err => console.log(err)
    )
  };
}

