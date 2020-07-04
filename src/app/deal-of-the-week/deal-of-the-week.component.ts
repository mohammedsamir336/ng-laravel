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
  selector: 'app-deal-of-the-week',
  templateUrl: './deal-of-the-week.component.html',
  styleUrls: ['./deal-of-the-week.component.css']
})
export class DealOfTheWeekComponent implements OnInit {

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
    rate: 'sdas',
    name: null,
  };

  dealData = {};
  trim: string;


  /* get DealOfTheWeek product data
  */
  getData(){
    this.call.DealOfTheWeek(this.form).subscribe(
      data => this.storageDeal(data),
      error => console.log(error)
    );
  }


  /*storage data
  */
  storageDeal(data){
    this.dealData = data;
    this.trim = this.getWords(data.introduction);
    console.log(this.dealData);

  }


  /*to get only 30 words of product introduction
  */
  getWords(str) {
    return str.split(/\s+/).slice(0, 30).join(" ");
  }

  ngOnInit(): void {
    this.getData();
  }

  //whene countdown is over and get 0
  someFunction(e){
    alert('sdsa');
  }


}
