import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSectionComponent } from './home-section/home-section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ShopComponent } from './layouts/shop/shop.component';
import { ContactsUsComponent } from './layouts/contacts-us/contacts-us.component';
import { ShoppingCartComponent } from './layouts/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './layouts/check-out/check-out.component';
import { FAQsComponent } from './layouts/faqs/faqs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeSectionComponent,  /*canActivate:[TokenService]*/ },//الفانشن دي عشان ميقدرش يروح المسار ده غير لما يحصل اللي موجود في السيرفز كونترولر
  { path: 'login', component: LoginComponent, },
  { path: 'register', component:  SignUpComponent, },
  { path: 'shop', component:  ShopComponent, },
  { path: 'contact', component:  ContactsUsComponent, },
  { path: 'Shopping Cart', component:  ShoppingCartComponent, },
  { path: 'checkout', component:  CheckOutComponent, },
  { path: 'FAQs', component:  FAQsComponent, },
  { path: '**', component: NotFoundComponent, },

  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
