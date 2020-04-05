import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';//Rating
import { FormControl, Validators } from '@angular/forms';
import { CallApiService } from "../../services/call-api.service";
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private location: Location,
    private config: NgbRatingConfig,
    private call: CallApiService,
    private myRouter: Router,
  ) { }

  Active = document.querySelector('#shop');

  public form = {
    name: null,
  };

  status: boolean;
  dataLength: number;
  filterLength: number;
  dataFilter = [];
  products = [];
  colorArray = [];
  brandsArray = [];

  filterPrice() {
    //filter Price
    $(document).ready(function() {
      $(".price-range").slider({
        orientation: "horizontal",
        range: true,
        min: 0,
        max: 900,
        step: 100,
        animate: true,
        slide: function(event, ui) {
          $("#minamount").val("$" + ui.values[0]/* + ",000"*/);
          $("#maxamount").val("$" + ui.values[1] /*+ ",000"*/);

        }
      })
        .slider("pips", {
          first: "pip",
          last: "pip",
          suffix: "k"
        });
    });
  }



  color(event, type) {

    this.getProducts(); //get data from api
    var term = event.target.name; // name of input
    var search = new RegExp(term, 'i'); // prepare a regex object search like php %value%
    var tt = new RegExp(type, 'i');
    //var check = this.dataFilter.find(item => search.test(item.color)); //check if already exists in filter array
    //  console.log(check.length);

    // if checkbox is checked true
    if (event.target.checked) {

      if (type == 'color') {
        var res = this.products.filter(x => search.test(x.color));//this.products.filter(item => search.test(item.color)/*&&*/);//search in data from api

        if (res) {
          res.forEach(x => {
            this.colorArray.push(x);
            this.dataFilter.push(x);

          });
          this.filterLength = this.dataFilter.length;
          this.status = true;
          //alert('true color');
        }

      } else if (type == 'brand') {
        var res = this.products.filter(x => search.test(x.brand));//this.products.filter(item => search.test(item.color)/*&&*/);//search in data from api

        if (res) {
          res.forEach(x => {
            this.dataFilter.push(x);
            this.brandsArray.push(x);
            //  const index = this.dataFilter.findIndex(e => e._id == x._id);

            /*if (index == -1 ) {
             this.dataFilter.push(x);
             this.brandsArray.push(x);

           }*/

          })
          this.filterLength = this.dataFilter.length;
          this.status = true;
          //alert('true brands');
        }
      }

      //var ff = this.brandsArray;//this.products.filter(item => search.test(item.color)/*&&*/);//search in data from api

      if (this.brandsArray.length && this.colorArray.length) {
        this.brandsArray.forEach(x => {
          const index = this.colorArray.findIndex(e => e._id == x._id);
          //console.log( index);
          if (index > -1) {
            this.dataFilter = [];
            this.dataFilter.push(x);
            //console.log( 'ok');
          }

        })
        this.filterLength = this.dataFilter.length;
        this.status = true;
        //alert('true ok');
      }

      //else if the checkbox unchecked (false)
    } else {
      if (type == 'color') {
        //check if the brands checkbox is checked
        if (this.brandsArray.length) {
          this.dataFilter = this.brandsArray;
          this.colorArray = [];

          this.filterLength = this.dataFilter.length;
          this.status = true;
          //else the brands checkbox is unchecked
        } else {
          this.dataFilter = [];
          this.colorArray = [];
          this.status = false;
        }
      }
      if (type == 'brand') {
        if (this.colorArray.length) {
          this.dataFilter = this.colorArray;
          this.brandsArray = [];

          this.filterLength = this.dataFilter.length;
          this.status = true;
        } else {
          this.dataFilter = [];
          this.brandsArray = [];
          this.status = false;

        }
      }


    }


  }


  /*product data from api
  */
  productsData(data) {
    this.products = data;
    this.dataLength = this.products.length;  //count products
    this.products ?? this.notFound();//if data not fount get error (404)
    //console.log(this.products);

  }

  /*if product error
  */
  notFound() {
    this.myRouter.navigateByUrl('not_found');
  }

  /*get all products
  */
  getProducts() {
    this.call.shop(this.form).subscribe(
      data => this.productsData(data),
      error => this.notFound()
    );
  }


  ngOnInit(): void {
    this.filterPrice();
    this.Active.classList.add("active");
    this.getProducts();

  }

  ngAfterViewInit(): void {




  }

  ngOnDestroy() {
    this.Active.classList.remove("active");// remove class whene leaves component

  }


}
