
import { Routes } from '@angular/router';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowUserFormIdComponent } from './show-user-form-id/show-user-form-id.component';

import { authGuard } from './auth.guard';
export const routes: Routes = [{path : 'PersonalDetails',component : PersonalDetailsComponent},
    {path:"showDetails/:id",component:DashboardComponent,canActivate:[authGuard]},
    {path : 'login',component : LoginComponent},
    {path : 'dashboard',component : ShowUserFormIdComponent,canActivate:[authGuard]},
    {path : 'signUp',component : SignupComponent}  ,
    {path : '',redirectTo : 'login' ,pathMatch:'full'},
]
