import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { CallApiService } from "../../services/call-api.service";
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private location: Location,
    private config: NgbRatingConfig,
    private call: CallApiService,
    private myRouter: Router,
  )
  {}

  Active = document.querySelector('#Cart');

  ngOnInit(): void {
    this.Active.classList.add("active");

    $.getScript("assets/js/main.js");//important link the script file
  }

  /*after leaves component do something
  */
  ngOnDestroy() {
  this.Active.classList.remove("active");// remove class whene leaves component

 }

}
