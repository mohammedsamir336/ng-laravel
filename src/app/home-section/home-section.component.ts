import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Observable } from 'rxjs/Observable';
import { ElementRef, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CallApiService } from "../services/call-api.service";
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import 'owl.carousel';
declare var $: any;
@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit {

  constructor(
    private call: CallApiService,
    private token: TokenService,
    public auth: AuthService
  ) { }


  html = '<div class="text-danger" id="nn">dfsdfsdfds</div>'
  Active = document.querySelector('#home');

  carousel() {
    //for all owlCarousel in website
    $(document).ready(function() {
      $(".Autoplay").owlCarousel({
        loop: true,
        margin:20,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
      });
      $(".owl-carousel").owlCarousel({
        smartSpeed:450,
        animateOut: 'fadeOut',//animate
        items: 1,
        loop: true,
        navigation : true,
        singleItem: true,
        nav: true,
        //margin:30,
        //slideSpeed: 20,
        //paginationSpeed: 20,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        dots: false,
        //autoHeight: true,
        //items: 2,
        stage: 1,
        //rtl: true,
        // navText: ['<i class="la la-angle-left" aria-hidden="true"></i>', '<i class="la la-angle-right" aria-hidden="true"></i>'],
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
      });

    });
  }

  ngOnInit(): void {
    this.carousel();
    this.Active.classList.add("active");

  }

  ngOnDestroy() {
    this.Active.classList.remove("active");// remove class whene leaves component

  }

}
