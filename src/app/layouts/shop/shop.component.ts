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
  dataLength:number;
  filterLength:number;
  dataFilter = [];
  products = [];


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

  checkAdult(age) {
    return age.item === 'ff';
  }

  myFunction() {
    //console.log(this.test.filter(el => el.name == 'ss'));

  }

  color(event) {
    this.getProducts(); //get data from api
    var term = event.target.name; // name of input
     var search = new RegExp(term , 'i'); // prepare a regex object search like php %value%
     var check = this.dataFilter.find(item => search.test(item.color)); //check if already exists in filter array
     // if checkbox is checked true
    if (event.target.checked) {
    let res = this.products.find(item => search.test(item.color));//search in data from api
        if (!check && res) {
          this.dataFilter.push(res);
          this.filterLength = this.dataFilter.length;
          this.status = true;
        }
        //else if the checkbox unchecked (false)
    }else{
      const index = this.dataFilter.indexOf(check);//return number of element position in array
      if (index > -1) {
      this.dataFilter.splice(index, 1);// remove from array
      this.filterLength = this.dataFilter.length; //the number of elements in array

      if ( this.filterLength === 0) {
          this.status = false; //to show the produts array (the data from api) in html again
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
    //console.log(this.test.find(el => el.name == 'ss'));

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
