import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tokenName } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  GoogleProvider = new firebase.auth.GoogleAuthProvider();
  FacebookProvider = new firebase.auth.FacebookAuthProvider();
  TwitterProvider = new firebase.auth.TwitterAuthProvider();

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http:HttpClient
  ) { }

  token : any;
  email : any;

  onSignInWithFacebookPopUp(){
    firebase.auth().signInWithPopup(this.FacebookProvider).then((result) => {
      console.log(result.user);
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard'])
    }).catch((error) => {
      console.error(error);
    });
  }


  onSignInWithGooglePopUp() {
    this.GoogleProvider.addScope("https://mail.google.com/");
    this.GoogleProvider.addScope("https://www.googleapis.com/auth/drive.file");
    firebase.auth().signInWithPopup(this.GoogleProvider).then((result) => {
      this.GoogleProvider.setCustomParameters({
        prompt: 'select_account'
      });     
      console.log("GOOGLE RES : " + JSON.stringify(result));
      const credential = result.credential as firebase.auth.OAuthCredential;
      this.token = credential.accessToken;
      this.email = result.user.email;
      console.log("Token : " + this.token);
      console.log("email : " + this.email);
      const TakeoauthaccessToken = result.user;
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard'])
    }).catch((error) => {
      console.error(error);
    });
  }

  Taketoken(){
    return this.token;
  }

  Takeemail(){
    return this.email;
  }

  onSignInWithTwitterPopUp() {
    firebase.auth().signInWithPopup(this.TwitterProvider).then((result) => {
      console.log(result.user);
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard'])
    }).catch((error) => {
      console.error(error);
    });
  }


  signUpUser(email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (result) => {
            console.log('Enregistré');
            result.user.sendEmailVerification();
          }
        ).catch(
          (error) => {
            reject(error)
          }
        )
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            console.log('Connecté');
            this.loggedIn.next(true);
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error)
          }
        )
      }
    );
  }

  SendAction(body: any) {
    const url = "http://0.0.0.0:5000/message";
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };
    console.log("body qui va etre envoyé " + JSON.stringify(body));
    return this.http.post(url, JSON.stringify(body), optionRequete)
  }

  logout() {
    firebase.auth().signOut;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
