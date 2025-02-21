import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ActivityComponent} from "./components/activity/activity.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./services/authGuard/auth-guard.service";

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: HomeComponent,  // Home will be the parent route
    canActivate: [AuthGuardService],  // Protect Home and its children
    children: [
      {
        path: 'contact',
        component: ContactComponent,  // Nested inside Home
      },
      {
        path: 'activity',
        component: ActivityComponent,  // Nested inside Home
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
      // Add other protected routes here
    ]
  },
  {
    path: '**',
    redirectTo: '/login',  // Default redirect to login for invalid routes
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
