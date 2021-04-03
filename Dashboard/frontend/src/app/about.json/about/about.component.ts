import { Component, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public ipAddress: any = "";
  constructor(private http:HttpClient) { }
  ngOnInit() {
             this.getIPAddress();
  }
  getIPAddress() {
                 this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
                 this.ipAddress = res.ip;
                 });
  }
  public the_about: any = {
        client: {
                host: "*"
        },
        server: {
                current_time: Math.floor(Date.now()/1000),
                services: [{
                          name: "coronavirus",
                          widgets: [{
                                   name: "country_statistics",
                                   description: "Display coronavirus statistics for a country",
                                   params: [{
                                           name: "country",
                                           type: "string"
                                   }]
                          }]
                },       {
                          name: "nasa",
                          widgets: [{
                                   name: "mars_views",
                                   description: "Display Mars different views by NASA cameras",
                                   params: [{
                                           name: "camera",
                                           type: "integer"
                                   }]
                          }]
                },       {
                          name: "football_encyclopedia",
                          widgets: [{
                                   name: "player_documentation",
                                   description: "Display football documentation for a player",
                                   params: [{
                                           name: "player",
                                           type: "string"
                                   }]
                          }]
                },       {
                          name: "trade",
                          widgets: [{
                                   name: "stock_exchange",
                                   description: "Display the stock market prices for an action",
                                   params: [{
                                           name: "action",
                                           type: "string"
                                   }]
                          }]
                },       {
                          name: "weather",
                          widgets: [{
                                   name: "city_temperature",
                                   description: "Display temperature for a city",
                                   params: [{
                                           name: "city",
                                           type: "string"
                                   }]
                          }]
                },       {
                          name: "football_headtohead",
                          widgets: [{
                                   name: "teams_antecedent",
                                   description: "Display the previous confrontation result between two teams",
                                   params: [{
                                           name: "home",
                                           type: "string"
                                   },     {
                                           name: "away",
                                           type: "string"
                                   }]
                          }]
                }]
        }
   };
}