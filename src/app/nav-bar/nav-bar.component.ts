import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private route: ActivatedRoute){}


  ngOnInit(): void {
    //this.url = location.pathname.replace('/', '');//part one of URL without slash

  }

  /*to add class acive to li of page For the page I'm on
  */
  active(url) {
    //console.log(window.location.pathname);
    //  console.log(window.location.origin);//part tow afrter slah of URL
  }

}
