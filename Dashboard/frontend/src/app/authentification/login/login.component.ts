import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthentificationService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.initSigninForm();
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
    this.authenticationService.signUpUser(email, password).then(
      () => {
        console.log('Okey');
        this.router.navigate(['/dashboard'])
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
