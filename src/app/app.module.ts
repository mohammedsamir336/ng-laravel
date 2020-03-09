//  Base Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CountdownModule } from "ng2-date-countdown";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//import { CookieService } from 'ngx-cookie-service';

//  routing
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { RouterModule, Routes } from '@angular/router';

//Components
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestComponent } from './test/test.component';
import { WomenBannerComponent } from './women-banner/women-banner.component';
import { DealOfTheWeekComponent } from './deal-of-the-week/deal-of-the-week.component';
import { ManBannerComponent } from './man-banner/man-banner.component';
import { InstagramComponent } from './instagram/instagram.component';
import { LatestComponent } from './latest/latest.component';
import { PartnerLogoComponent } from './partner-logo/partner-logo.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

//services


//jquery
import * as $ from 'jquery';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeSectionComponent,
    NotFoundComponent,
    TestComponent,
    WomenBannerComponent,
    DealOfTheWeekComponent,
    ManBannerComponent,
    InstagramComponent,
    LatestComponent,
    PartnerLogoComponent,
    LoginComponent,
    SignUpComponent,

  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   CarouselModule,
   BrowserAnimationsModule,
   OwlModule,
   NoopAnimationsModule,
   FormsModule,
   ReactiveFormsModule,
   RouterModule,
   HttpClientModule,
   CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
