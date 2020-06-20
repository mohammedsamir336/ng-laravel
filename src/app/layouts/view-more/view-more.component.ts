import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { FormControl, Validators } from '@angular/forms';
import { CallApiService } from "../../services/call-api.service";
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { SnotifyService } from 'ng-snotify';
declare var $: any;

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  constructor(
    private location: Location,
    private config: NgbRatingConfig,
    private call: CallApiService,
    private myRouter: Router,
    private auth: AuthService,
    private notify: SnotifyService,
    private token: TokenService,
  ) {
    // customize default values of ratings used by this component tree
    config.max = 5; //number of rating stars
    //config.readonly = true //hold Rating

  }

  public loggedIn: boolean;// check auth

  //ctrl = new FormControl(null, Validators.required);
  currentRate: number;
  rateAvg: number;
  price: number;
  rateCount: number;
  trim: string;
  product: any;
  commentsData: any;
  color = [];
  size = [];

  //post rhe product to DB cart table api
  selectColor = [];
  selectSize = [];
  cartStatus: boolean;
  loadMoreCommentStatus: boolean;

  public cartForm = {
    name: null,
    item: null,
    price: null,
    color: null,
    size: null,
    number: null,
    user: null,
    img: null,
  };

  public form = {
    rate: null,
    name: null,
  };

  public commentsForm = {
    productName: null,  //productName in function getUrlName
    name: null, //from input
    email: null,//from input
    text: null,//from input
    skip:null,//from function getMoreComments
  };

  commentsError = {
    name: null,
    email: null,
    text: null,
  };



  /*when select color
  */
  colorSelect(event) {
    let val = event.target.value;
    //id checked
    if (event.target.checked) {
      this.selectColor.push(val);
    } else {
      const index = this.selectColor.findIndex(e => e == val); //remove from array
      if (index > -1) {
        this.selectColor.splice(index, 1);

      }

    }

  }

  /*when select size
  */
  sizeSelect(event) {
    let val = event.target.value;
    let sizeLabel = document.querySelector('#' + val + '-label'); // size checkbox label
    if (event.target.checked) {
      this.selectSize.push(val);

      sizeLabel.classList.remove("size");
      sizeLabel.classList.add("selectSize");// this class to know what size id selector
    } else {
      const index = this.selectSize.findIndex(e => e == val);
      if (index > -1) {
        this.selectSize.splice(index, 1);
        sizeLabel.classList.remove("selectSize");
        sizeLabel.classList.add("size");
      }

    }
  }
  /*setRate into DB
  */
  setRate(index) {
    this.form.rate = index; //index number of star from html
    this.call.setRating(this.form).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.getRate(); //for get new data from DB after rating
  }

  /*getRate into DB
  */
  getRate() {
    this.call.getRating(this.form).subscribe(
      data => this.ratingData(data),
      error => console.log(error)
    );
  }

  /*data from DB
  */
  ratingData(data) {
    this.currentRate = data.rate.rating;// visitor rating
    this.rateAvg = data.rateAvg.toFixed(1); //toFixed to Select a number after Decimal point (,)
    this.rateCount = data.rateCount;
  }

  /*
  */
  /*filterPrice() {
    //filter Price
    $(document).ready(function() {
      $(".price-range").slider({
        orientation: "horizontal",
        range: true,
        min: 100,
        max: 900,
        step: 100,
        animate: true,
        slide: function(event, ui) {
          $("#minamount").val("$" + ui.values[0]/* + ",000"*///);
  //  $("#maxamount").val("$" + ui.values[1] /*+ ",000"*/);

  //  }
  //  })
  /*    .slider("pips", {
         first: "pip",
          last: "pip",
          suffix: "k"
        });
    });
  }*/


  /*get name of products from url
  */
  getUrlName() {
    this.form.name = location.pathname.split('/')[2].replace('%20', ' ');
    this.commentsForm.productName = location.pathname.split('/')[2].replace('%20', ' ');
  }


  quantity() {
    /*-------------------
     Quantity change
   --------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function() {
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc') ) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 1  ) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      $button.parent().find('input').val(newVal);

    });

  }

  /*set product in cart DB
  */
  putIntoCart(data) {
    let input = $('.pro-qty').parent().find('input').val(); // input of Quantity
    this.cartForm.color = this.selectColor.toString();
    this.cartForm.size = this.selectSize.toString();
    this.cartForm.number = input;
    this.cartForm.price = input * this.price;
    this.loggedIn ? this.authSetCart()
                  : this.guestSetCart();

  }

  /*set cart data api to DB if auth
  */
  authSetCart() {
    let tok = this.token.get();
   this.cartForm.user = tok.split('.')[1] + 'Y9';
   this.guestSetCart();

  }

  /*set cart data api to DB if guest
  */
  guestSetCart() {
    this.call.setCart(this.cartForm).subscribe(
      data =>  console.log(data),
      error => this.dataCartNotify(error)
    );
  }

  /*user data if success
  */
  dataCartNotify(error) {
    this.notify.info('Waiting... ', { timeout: 2000 });
    setTimeout(() => {
      this.notify.success(error.error.text, { timeout: 0 });
    }, 4000);
  }

  /*change Url and remove %20
  */
  /*changeUrl(){
    let url = location.pathname.replace('%20', '_');//decodeURI(location.pathname);
    this.location.replaceState(url);//change url and remove %20
    //console.log(location.pathname.split('/')[2]);

  }*/

  /*to get only 30 words of product introduction
  */
  getWords(str) {
    return str.split(/\s+/).slice(0, 30).join(" ");
  }



  /*split data and push into array
  */
  splitData(data) {
    let res = data.color.split(",").join(" ");// get color without (,)
    this.color = res.split(' ');//push color into array
    let si = data.size.split(",").join(" ");// get size without (,)
    this.size = si.split(' ');//push size into array
  }


  /*product data from api
  */
  productData(data) {
    this.notFound(data); //if data not fount get error (404)
    this.product = data;
    this.price = data.new_price;
    this.cartForm.name = data.name;
    this.cartForm.item = data.item;
    this.cartForm.img = data.img2;
    this.trim = this.getWords(data.introduction);
    this.splitData(data);

  }

  /*if product error
  */
  notFound(data) {
    data ?? this.myRouter.navigateByUrl('not_found');
  }
  /*get products data
  */
  getProduct() {
    this.call.viewMore(this.form).subscribe(
      data => this.productData(data),
      error => this.notFound(error)
    );
  }

  /*comments
  */
  setComments(){
    this.call.setComments(this.commentsForm).subscribe(
      data => this.setCommentsData(data),
      error => this.errorscomment(error)
    );
  }
  /*action after set comments
  */
  setCommentsData(data){
  this.notify.success(data.message);
  //delete inputs text after set data
  this.commentsForm.name= null;
  this.commentsForm.email= null;
  this.commentsForm.text= null;
  }

  /*error of comments from api
  */
  errorscomment(error){
    this.commentsError = error.error.errors;
    this.notify.error(error.error.message);
  }

  /*get comments
  */
  getComments(){
    this.call.getComments(this.commentsForm).subscribe(
      data => this.commData(data),
      error => console.log(error)
    );
  }

  /*comments from api
  */
  commData(data){
    this.commentsData = data;
  /*  data.forEach(element => {
  let date = element.created_at;
  console.log(new Date(date,0))
});*/
    //console.log(data);

  }

  /*load more comments
  */
  getMoreComments(num) {
    this.commentsForm.skip = num; //number of this.commentsData.length
    this.call.MoreComments(this.commentsForm).subscribe(
      data => this.getMoreCommentsData(data),
      error => console.log(error)
    );
  }

  /* data from load more  comments api
  */
  getMoreCommentsData(data) {
    data.length ? this.loadMoreCommentStatus = true : this.loadMoreCommentStatus = false; //chanage loadmor btn to loadcomplet
    for (let more of data) {
      this.commentsData.push(more);
      //this.cartData = this.arrayData; // show data
      this.commentsForm.skip = this.commentsData.length; //to send skip number
    }
  }

  ngOnInit(): void {
    //this.filterPrice();
    this.getUrlName();
    this.getRate();
    this.getProduct();
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    //this.changeUrl();
    this.quantity();
   setInterval(() => { //getComments
      this.getComments();
    }, 4000);
    $.getScript("assets/js/main.js");//import script link in component html
  }


}
