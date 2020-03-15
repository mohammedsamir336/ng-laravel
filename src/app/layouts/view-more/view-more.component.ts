import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  constructor() { }
  filterPrice() {

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



  /*quantity(){
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      $button.parent().find('input').val(newVal);
    });
  }*/


  ngOnInit(): void {
   this.filterPrice();
    //this.quantity();
   $.getScript("assets/js/main.js");//important link the script file

  }


}
