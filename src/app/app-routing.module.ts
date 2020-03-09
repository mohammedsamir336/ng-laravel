import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeSectionComponent,  /*canActivate:[TokenService]*/ },//الفانشن دي عشان ميقدرش يروح المسار ده غير لما يحصل اللي موجود في السيرفز كونترولر
  { path: 'login', component: LoginComponent, },
  { path: 'register', component:  SignUpComponent, },
  { path: '**', component: NotFoundComponent, },

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
