import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, Login, Register],
})
export class AuthModule {}
