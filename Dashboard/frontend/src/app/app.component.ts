import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dash';

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyA2JA8DyaojeMAK8IbnEoZYQaf-Fk50reA",
      authDomain: "dashboard-2d638.firebaseapp.com",
      databaseURL: "https://dashboard-2d638.firebaseio.com",
      projectId: "dashboard-2d638",
      storageBucket: "dashboard-2d638.appspot.com",
      messagingSenderId: "736619400246",
      appId: "1:736619400246:web:85b55e14a07b5969d3dc97"
    };
    firebase.initializeApp(firebaseConfig);
  }

}
