import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

declare function TestingJS(): any;
declare function sendemail(email: any, id: any, to: any, subject: any, body : any): any;
declare var gapi: any;

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  signinForm: FormGroup;
  weather: any;
  testing = "On est bon";
  resultats: any;
  res: any;
  displayTemp = false;
  fahrenheit: any;
  ID : any;
  email : any;
  url="api.openweathermap.org/data/2.5/weather?q="
  API="&appid=50a3d9069642e4b85379632ba2126c5a"

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private authenticationService: AuthentificationService,
    ) { 
  }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      To: ['', [Validators.required, Validators.minLength(3)]],
      Subject: ['', [Validators.required, Validators.minLength(3)]],
      Message: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ClickGoogleAuth(){
    this.authenticationService.onSignInWithGooglePopUp();
  }

  async SubmitEmail() {
    const To = this.signinForm.get('To')?.value;
    const Subject = this.signinForm.get('Subject')?.value;
    const Message = this.signinForm.get('Message')?.value;
    this.ID = this.authenticationService.Taketoken();
    this.email = this.authenticationService.Takeemail();
    const JSONPush = 
    {
      "message" : {
        "token": this.ID,
        "email": this.email,
        "to":  To,
        "subject":  Subject,
        "message":  Message,
                  }
    };
    console.log("Token: " + this.ID);
    console.log("email: " + this.email);
    console.log("Action " + JSON.stringify(JSONPush))
    this.authenticationService.SendAction(JSONPush).subscribe(data => {
      console.log(data);
    },
    err => console.log("ERROR: " + JSON.stringify(err))
    )
  };

}
