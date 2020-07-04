import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { FormControl, Validators } from '@angular/forms';
import { CallApiService } from "../services/call-api.service";
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { SnotifyService } from 'ng-snotify';
import { OwlCarousel } from 'ngx-owl-carousel';
import 'owl.carousel';
declare var $: any;

@Component({
  selector: 'app-women-banner',
  templateUrl: './women-banner.component.html',
  styleUrls: ['./women-banner.component.css']
})
export class WomenBannerComponent implements OnInit {

  constructor(
    private location: Location,
    private config: NgbRatingConfig,
    private call: CallApiService,
    private myRouter: Router,
    private auth: AuthService,
    private notify: SnotifyService,
    private token: TokenService,
  ) {
    //for all owlCarousel in website
    $(document).ready(function() {
      $(".Autoplay").owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
      });

      setTimeout(function() {
        $('.mmmm').owlCarousel({
          loop: true,
          margin: 20,
          nav: true,
          items: 4,
          smartSpeed: 450,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          autoplay: true,
          dots: false,
          navigation: true,
          singleItem: true,
          /*responsive: {
            0: {
              items: 1
            },
          /*  600: {
              items: 2
            },
            1000: {
              items: 4
            }
          }*/

        });
      }, 300);
      /*$(".owl-carousel").owlCarousel({
        loop: true,
    //  margin: 10,
       //nav: false,
        //smartSpeed: 450,
        //animateOut: 'fadeOut',//animate
      items: 1,
      //  navigation: true,
        //singleItem: true,
      //  nav: true,
        //margin:30,
        //slideSpeed: 20,
        //paginationSpeed: 20,
      //  autoplay: true,
      //  autoplayTimeout: 7000,
      //  autoplayHoverPause: true,
      //  dots: false,
        //autoHeight: true,
        //items: 2,
      //  stage: 1,
      //  loop: true,

        //rtl: true,
        // navText: ['<i class="la la-angle-left" aria-hidden="true"></i>', '<i class="la la-angle-right" aria-hidden="true"></i>'],
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
      });*/

    });
}


  public form = {
    type: null,
    cat: null,
  };

  categoryArray = [];

  /*get products data
   */
  getProduct(cat,type){
    $('.Women').removeClass("active"); //remove class active from all li
    document.querySelector('#'+type).classList.add("active"); //add class active to select one
    this.form.cat = cat;
    this.form.type = type;
    this.call.category(this.form).subscribe(
      data => this.categoryData(data),
      error => console.log(error)
    );
  }


  categoryData(data){
    this.categoryArray = data;
      console.log(data);
  }

  ngOnInit(): void {
   this.getProduct('Women','Clothing');

  }


}
