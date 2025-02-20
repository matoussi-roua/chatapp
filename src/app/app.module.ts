import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule} from './auth/auth.module'
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { ContactComponent } from './components/contact/contact.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ProfileComponent } from './components/profile/profile.component';
import {TableModule} from "primeng/table";
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from "primeng/menu";
import {HelloModuleModule} from "./hello-module/hello-module.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    ActivityComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    SplitButtonModule,
    MenuModule,
    HelloModuleModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
