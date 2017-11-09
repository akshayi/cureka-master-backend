import {Routes} from "@angular/router";
import { AuthGuard } from './auth.guard';
import {LoginComponent} from "../pages/users/login.component";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {Add_MedicinesComponent} from "../pages/medicines/medicines.component";
import {Add_CausesComponent} from "../pages/causes/causes.component";
import {Add_AttributesComponent} from "../pages/medicines/attributes.component";
import {TermsComponent} from "../pages/terms/terms.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {Add_QuestionComponent} from "../pages/question/question.component";
import {HomepageComponent} from "../pages/home/home.component";

export const rootRouterConfig: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'add-question', component: Add_QuestionComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'add-medicines', component: Add_MedicinesComponent, canActivate: [AuthGuard]},
  {path: 'add-med-attributes', component: Add_AttributesComponent, canActivate: [AuthGuard]},
  {path: 'add-causes', component: Add_CausesComponent, canActivate: [AuthGuard]}
];
