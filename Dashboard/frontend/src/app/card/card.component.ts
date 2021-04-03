import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  readonly ROOT_RL = 'https://api.twitter.com/1.1//followers/list.json';
  posts : any;
  resultas: any;

  @Input() title: string;
  constructor( 
    private authenticationService: AuthentificationService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getFeed();
    console.log(this.posts);
  }

  getFeed(){
    this.posts = this.httpClient.get(this.ROOT_RL)
        .subscribe(
          (response) => {
            this.resultas = response;
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  };

}