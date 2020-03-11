import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() {}

  Active = document.querySelector('#shop');

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

  ngOnInit(): void {
    this.filterPrice();
   this.Active.classList.add("active");
  }


ngOnDestroy() {
  this.Active.classList.remove("active");// remove class whene leaves component

}


}
