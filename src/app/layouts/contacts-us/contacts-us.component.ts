import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-us',
  templateUrl: './contacts-us.component.html',
  styleUrls: ['./contacts-us.component.css']
})
export class ContactsUsComponent implements OnInit {

  constructor() { }

  Active = document.querySelector('#contact');//from nav component

  ngOnInit(): void {
     this.Active.classList.add("active");
  }


  ngOnDestroy() {
    this.Active.classList.remove("active");// remove class whene leaves component

  }

}
