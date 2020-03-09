import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Observable } from 'rxjs/Observable';
import { ElementRef, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import 'owl.carousel';
declare var $: any;
@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent implements OnInit {

  constructor() { }


  html = '<div class="text-danger" id="nn">dfsdfsdfds</div>'


  carousel() {
    //for all owlCarousel in website
    $(document).ready(function() {
      $(".Autoplay").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
      });
      $(".owl-carousel").owlCarousel();
    });
  }

  ngOnInit(): void {

    this.carousel();
  }

}
