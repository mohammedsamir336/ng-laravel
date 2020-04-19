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
    skip: 0,
  };

  status: boolean; //to show filter data or hidden
  loadMoreStatus: boolean;
  dataLength: number;
  filterLength: number;
  dataFilter = [];//data after filter
  products = [];//all data
  allProduts = [];//all data for filter
  colorArray = [];
  brandsArray = [];
  paginate = {
  next_page_url: null,
  prev_page_url: null,
  };

  //  وتخليه يساوي الداتا اللي جايه علي طولproductsملحوظة لو عايز تعمل زرار المزيد لازم تعدل في اللارافيل وبعدين تعدل الاري

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

  /*next and prev pages
  */
  PAGINATE(url){
    this.call.paginateUrl(url).subscribe(
      data => this.productsData(data),
      error => console.log(error)
    );
  }

  checkBox(event, type) {
    this.dataFilter = []; //delete all filters
    this.getAll(); //get data from api
    var term = event.target.name; // name of input
    var search = new RegExp(term, 'i'); // prepare a regex object search like php %value%
    //var tt = new RegExp(type, 'i');
    //var check = this.dataFilter.find(item => search.test(item.color)); //check if already exists in filter array
    //  console.log(check.length);

    // if checkbox is checked true
    if (event.target.checked) {

      if (type == 'color') {
        this.colorArray = [];// delete all filter color
        var res = this.allProduts.filter(x => search.test(x.color));//this.products.filter(item => search.test(item.color)/*&&*/);//search in data from api

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
        this.brandsArray = [];// delete all filter brands
        var res = this.allProduts.filter(x => search.test(x.brand));//this.products.filter(item => search.test(item.color)/*&&*/);//search in data from api

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

  /*get all produts data for filter
  */
  getAll() {
    this.call.produtsFilter(this.form).subscribe(
      data => this.allProduts = data,
      error => console.log(error)
    );
  }


  /*product data from api
  */
  productsData(data) {
    this.paginate = data;
    this.products = data.data;
    this.dataLength = this.products.length;  //count products
    this.products ?? this.notFound();//if data not fount get error (404)
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

  /*get more data from api by loadmore button
  */
  getMore(num) {
    this.form.skip = num; //number of this.products.length
    this.call.shop(this.form).subscribe(
      data => this.getMoreData(data),
      error => console.log(error)
    );
  }

  /*data from getMore function
  */
  getMoreData(data) {
    data.length ? this.status = true : this.status = false; //chanage loadmor btn to loadcomplet
    for (let more of data) {
      this.products.push(more);
      this.dataLength = this.products.length; // show number of current produts
      this.form.skip = this.products.length; //to send skip number
    }

  }


  ngOnInit(): void {
    this.filterPrice();
    this.Active.classList.add("active");
    this.getProducts();
    this.clickCheckBox();

  }


  clickCheckBox() {
    $(document).on('click', 'input[class="brands"]', function() {
      $('input[class="brands"]').not(this).prop('checked', false);
    });
    $(document).on('click', 'input[class="color"]', function() {
      $('input[class="color"]').not(this).prop('checked', false);
    });
  }


  ngAfterViewInit(): void {
    this.getAll();//get all data for filter

    /*(function() {
      var divElements = [
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/TDdxS9H.png' },
        { imgUrl: 'http://i.imgur.com/39rpmwB.jpg' },
        { imgUrl: 'http://i.imgur.com/39rpmwB.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' },
        { imgUrl: 'http://i.imgur.com/CmU3tnl.jpg' }
      ];
      var loadMore = document.querySelector('#loadMore');
      var divNumber = 2;

      loadMore.addEventListener('click', function(e) {
        e.preventDefault();
        var container = document.getElementById('container');
        for (var i = 0; i < divNumber; i++) {
          window.scrollTo(0, document.body.scrollHeight);
          if (i < divElements.length) {
            var element = createElement(divElements[i].imgUrl);
            container.appendChild(element);
          }

          if (i >= divElements.length) {
            loadMore.innerHTML = "Load Completed";
            return;
          }

        }
        divElements.splice(0, divNumber);

      });
    })();
    loadMore.click();

    function createElement(url) {
      var container = document.createElement('div');
      container.setAttribute('class', 'article-loop');
      var image = document.createElement('img');
      image.setAttribute('src', url);
      container.appendChild(image);
      return container;
    }*/
  }

  ngOnDestroy() {
    this.Active.classList.remove("active");// remove class whene leaves component
  }


}
