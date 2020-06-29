import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { FormControl, Validators } from '@angular/forms';
import { CallApiService } from "../services/call-api.service";
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { SnotifyService } from 'ng-snotify';
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
  ) { }


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
