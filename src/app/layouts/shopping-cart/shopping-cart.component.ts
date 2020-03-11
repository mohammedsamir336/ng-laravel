import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }

  Active = document.querySelector('#Cart');

  ngOnInit(): void {
    this.Active.classList.add("active");
  }

  /*after leaves component do something
  */
  ngOnDestroy() {
  this.Active.classList.remove("active");// remove class whene leaves component

 }

}
