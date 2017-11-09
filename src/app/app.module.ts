import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth.guard';
import {DataService} from "../services/services.component";
import { AppComponent } from './app.component';
import {LoginComponent} from "../pages/users/login.component";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {HeaderComponent} from "../pages/common/header.component";
import {Menu_adminComponent} from "../pages/common/menu.component";
import {Add_MedicinesComponent} from "../pages/medicines/medicines.component";
import {Add_CausesComponent} from "../pages/causes/causes.component";
import {Add_AttributesComponent} from "../pages/medicines/attributes.component";
import {TermsComponent} from "../pages/terms/terms.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {Add_QuestionComponent} from "../pages/question/question.component";
import {HomepageComponent} from "../pages/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    Menu_adminComponent,
    Add_MedicinesComponent,
    Add_CausesComponent,
    Add_AttributesComponent,
    TermsComponent,
    PrivacyComponent,
    Add_QuestionComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false})
  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
