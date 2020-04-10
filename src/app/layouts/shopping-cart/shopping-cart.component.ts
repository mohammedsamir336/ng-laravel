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
  ) {}

  public loggedIn: boolean;// check auth
  active = document.querySelector('#Cart');


  public cartForm = {
    user: null,
    id  : null
  };

  cartData: any;

  getDataCart(){
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
      data =>  this.cartData = data,
      error => console.log(error)
    );
  }


  /* delete cart
  */
  delCart(id){
    this.cartForm.id = id;
    this.call.deleteCart(this.cartForm).subscribe(
      data =>  console.log(data),
      error => this.delCartNotify(error)
    );
     //this.getDataCart();
     this.ngOnInit();
  }


  /*deleted notify
  */
  delCartNotify(error) {
    this.notify.success(error.error.text, { timeout: 1000 });
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
