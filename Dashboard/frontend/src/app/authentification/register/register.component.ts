import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { AuthGuard } from 'src/app/services/auth.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  ClickGoogleAuth(){
    this.authenticationService.onSignInWithGooglePopUp();
  }

  ClickFacebookAuth(){
    this.authenticationService.onSignInWithFacebookPopUp();
  }

  ClickTwitterAuth(){
    this.authenticationService.onSignInWithTwitterPopUp();
  }


  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitSigninForm() {
    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
    this.authenticationService.signInUser(email, password).then(
      (data) => {
             this.router.navigate(['/dashboard'])
             console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
