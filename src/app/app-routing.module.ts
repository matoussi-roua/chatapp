import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ActivityComponent} from "./components/activity/activity.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [

   { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }// Optional: Add a default route for login

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
