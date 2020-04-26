import { Component, OnInit, AfterViewInit, Input, Output, ViewChild } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CallApiService } from "../services/call-api.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private myRouter: Router,
    private auth: AuthService,
    private token: TokenService,
    private call: CallApiService,
    private location: Location,
    private http: HttpClient,
  ) { }

  public form = {
    search: null,
  };

  paginate = {
    next_page_url: null,
    prev_page_url: null,
  };

  products = [];
  //allSearchData: any;//all data
  searchError: string;
  pagesNumber = [];

// كل ثانية بطابق العنوان بكلمات البحث وابحث في الداتا بيز
  getSearch() {
    // listen for changes
    setInterval(() => {
      // store url on load
      var currentPage = location.pathname.split('/')[2].replace('_', ' ');
      if (currentPage != this.form.search) {
        // page has changed, set new page as 'current'
        this.form.search = currentPage;

        this.call.search(this.form).subscribe(
          data => this.searchData(data),
          error => this.error(error)
        );
      }
    }, 1000);

  }

  /*search error
  */
  error(error) {
    this.searchError = error.error.text; //result not fount
    this.products = []; //delete old data
    this.pagesNumber = []; //delete old data
    this.paginate = error; //delete old data
  }

  /*get search data
  */
  searchData(data) {
    this.products = data.data;
    this.paginate = data;
    this.pagesNumber = []; //delete old data of paginate number

    let lastPage = data.last_page; // get last page
    for (let i = 1; i <= lastPage; i++) { //get number of all pages by for method
      this.pagesNumber.push(i);
    }

  }

  //العنوان اللي جي من الصفحة الرئيسية (html)
  PAGINATE(url) {
    this.call.searchPaginate(url).subscribe(
      data => this.searchData(data),
      error => console.log(error)
    );
  }


  ngOnInit(): void {
    this.getSearch();

  }

}
