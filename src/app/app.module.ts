//  Base Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CountdownModule } from "ng2-date-countdown";
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
import { WomenBannerComponent } from './women-banner/women-banner.component';
import { DealOfTheWeekComponent } from './deal-of-the-week/deal-of-the-week.component';
import { ManBannerComponent } from './man-banner/man-banner.component';
import { InstagramComponent } from './instagram/instagram.component';
import { LatestComponent } from './latest/latest.component';
import { PartnerLogoComponent } from './partner-logo/partner-logo.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ShopComponent } from './layouts/shop/shop.component';
import { ContactsUsComponent } from './layouts/contacts-us/contacts-us.component';
import { ShoppingCartComponent } from './layouts/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './layouts/check-out/check-out.component';
import { FAQsComponent } from './layouts/faqs/faqs.component';
import { ViewMoreComponent } from './layouts/view-more/view-more.component';
import { ScrollTopComponent } from './layouts/scroll-top/scroll-top.component';
import { ForgetPassComponent } from './auth/forget-pass/forget-pass.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { SearchComponent } from './search/search.component';


//ngx-translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';//الترجمة
import {TranslateHttpLoader} from '@ngx-translate/http-loader';//الترجمة

//npm
import { ShowHidePasswordModule } from 'ngx-show-hide-password';//Show Hide Password
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgxPayPalModule } from 'ngx-paypal';//paypal
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';//ng-bootstrap

//jquery
import * as $ from 'jquery';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeSectionComponent,
    NotFoundComponent,
    WomenBannerComponent,
    DealOfTheWeekComponent,
    ManBannerComponent,
    InstagramComponent,
    LatestComponent,
    PartnerLogoComponent,
    LoginComponent,
    SignUpComponent,
    ShopComponent,
    ContactsUsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    FAQsComponent,
    ViewMoreComponent,
    ScrollTopComponent,
    ForgetPassComponent,
    ResetPassComponent,
    SearchComponent,


  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   CarouselModule,
   BrowserAnimationsModule,
   OwlModule,
   NgbModule,//ng-bootstrap
   NoopAnimationsModule,
   FormsModule,
   NgxPayPalModule,//paypal
   ReactiveFormsModule,
   RouterModule,
   HttpClientModule,
   CountdownModule,
    SnotifyModule,
   ShowHidePasswordModule,//Show Hide Password
   TranslateModule.forRoot({//ترجمة
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
  ],
  providers:[

    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
