import { Component, ViewChild, AfterViewInit, ElementRef, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { HomeSectionComponent } from './home-section/home-section.component';
import { HttpClient} from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs/Observable';
//import Html from "../src/view/includehtmlfile.html";
import "jquery"
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit {
  title = 'ng-L';

  constructor() { }

   ngAfterViewInit(): void {
     //$('.owl-carousel').owlCarousel();
  }

   ngOnInit() {

 }

  /*customOptions: OwlOptions  = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }*/

  /*@ViewChild('selector') private elementName;
 ngAfterViewInit() {
    //this is your dom
    this.elementName.owlCarousel();
 }*/

}
