import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';
import { Observable } from 'rxjs/Observable';
import { ElementRef, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import 'owl.carousel';
declare var $: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  /*@ViewChild('selector') private elementName;
 ngAfterViewInit() {
    //this is your dom
    this.elementName.owlCarousel();
 }*/
  ngOnInit(): void {
  }

}
