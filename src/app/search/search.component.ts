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
  allSearchData: any;//all data

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
          error => console.log(error)
        );
      }
    }, 1000);

  }

  /*get search data
  */
  searchData(data) {
    this.products = data.data;
    this.paginate = data;
  }

  PAGINATE(url) {
    this.call.searchPaginate(url).subscribe(
      data =>  this.searchData(data),
      error => console.log(error)
    );
  }


  ngOnInit(): void {
    this.getSearch();

  }

}
