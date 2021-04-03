import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { CardComponent } from './card/card.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './about.json/about/about.component';


const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'register', component: LoginComponent },
  { path: 'login', component: RegisterComponent },
  { path: 'card', component: CardComponent },
  { path: 'about.json', component: AboutComponent },
  { path: '**', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
