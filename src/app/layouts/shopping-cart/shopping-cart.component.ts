import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { CallApiService } from "../../services/call-api.service";
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

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
    private auth: AuthService,
    private token: TokenService,
    private notify: SnotifyService,
  ) { }

  public loggedIn: boolean;// check auth
  active = document.querySelector('#Cart');


  public cartForm = {
    user: null,
    id: null,
    skip: 0
  };

  arrayData = [];
  cartData: any;
  status: boolean;
  total: number;


  getDataCart() {
    this.loggedIn ? this.authGetCart()
      : this.guestGetCart();
  }


  /*get cart data api to DB if auth
  */
  authGetCart() {
    let tok = this.token.get();
    this.cartForm.user = tok.split('.')[1] + 'Y9';
    this.guestGetCart();

  }

  /*set cart data api to DB if guest
  */
  guestGetCart() {
    this.call.getCart(this.cartForm).subscribe(
      data => this.resultData(data),
      error => console.log(error)
    );
  }

  resultData(data) {
    data.result.length ? this.status = true : this.status = false; //chanage loadmor btn to loadcomplet
    this.arrayData = data.result;
    this.cartData = data.result;
    this.total = data.total;
  }


  sendDataToNavBar(){
    return 'send data to navbar from function';
  }


  /* delete cart from DB
  */
  delCart(id) {
    this.cartForm.id = id; //from html
    this.delCartFromArray(id); //delete from array first
    //delete from DB then get new data and notify delete success
    this.call.deleteCart(this.cartForm).subscribe(
      data => console.log(data),
      error => this.delCartNotify(error)
    );
  }

  /*delete cart from array
  */
  delCartFromArray(id) {
    const index = this.arrayData.findIndex(e => e._id === id);// return number
    if (index > -1) {
      this.arrayData.splice(index, 1);// remove from array
      this.cartData = 5; //to dont let cartData empty
    }
  }


  /*deleted notify
  */
  delCartNotify(error) {
    this.getDataCart(); // get new data after delete some data
    this.notify.success(error.error.text, { timeout: 1000 });
  }

  /*load more
  */
  getMore(num) {
    if (this.loggedIn) {
      let tok = this.token.get();
      this.cartForm.user = tok.split('.')[1] + 'Y9';
    }
    this.callLoadMore(num);
  }

  callLoadMore(num) {
    this.cartForm.skip = num; //number of this.arrayData.length
    this.call.getCart(this.cartForm).subscribe(
      data => this.getMoreData(data),
      error => console.log(error)
    );
  }

  /* data from load more api
  */
  getMoreData(data) {
    data.result.length ? this.status = true : this.status = false; //chanage loadmor btn to loadcomplet
    for (let more of data.result) {
      this.arrayData.push(more);
      this.cartData = this.arrayData; // show data
      this.cartForm.skip = this.arrayData.length; //to send skip number
    }
  }


  ngOnInit(): void {
    this.getDataCart();
    this.active.classList.add("active");
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    $.getScript("assets/js/main.js");//important link the script file
  }

  /*after leaves component do something
  */
  ngOnDestroy() {
    this.active.classList.remove("active");// remove class whene leaves component

  }

}
