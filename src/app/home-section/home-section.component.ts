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
    public auth: AuthService,

  ) { }


  html = '<div class="text-danger" id="nn">dfsdfsdfds</div>'
  Active = document.querySelector('#home');
  dataOffers = [];


  carousel() {
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
        $('.documentation').owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          items: 1,
          smartSpeed: 450,
          animateOut: 'fadeOut',//animate
          autoplay: true,
          autoplayTimeout: 7000,
          autoplayHoverPause: true,
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

  /*get offers data*/
  callOffers() {
    this.call.offersData().subscribe(
      data => this.setOffers(data),
      error => console.log(error)

    );
  }

  /*append data into html
  */
  appendData(){
    /*data.forEach(element => {
      let imgPath = 'assets/img/'+element.img+'';
   this.string += '<div class="single-hero-items set-bg" [style.background]=""url(' + imgPath + ')""><div class="container"><div class="row"><div class="col-lg-5"><span>'+element.tag+'</span><h1>'+element.title+'</h1><p>'+element.p+'</p><a href="#" class="primary-btn">Shop Now</a></div> </div><div class="off-card"><h2>Sale <span>'+element.sale+'%</span></h2></div></div></div>';
   //[ngStyle]="{"background-image":"url(" + "assets/img/" + sdsadas  + ")"}"
   });

    this.string = this.string.replace('undefined','');
   $('.documentation').append(this.string);*/
  }



  setOffers(data) {
    this.dataOffers = data;

  }

  ngOnInit(): void {
    this.callOffers();
    this.Active.classList.add("active");
  }

  ngOnDestroy() {
    this.Active.classList.remove("active");// remove class whene leaves component

  }

  ngAfterViewInit(): void {
    this.carousel();//owlCarousel

  }


}
