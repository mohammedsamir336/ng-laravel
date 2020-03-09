import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-of-the-week',
  templateUrl: './deal-of-the-week.component.html',
  styleUrls: ['./deal-of-the-week.component.css']
})
export class DealOfTheWeekComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //whene countdown is over and get 0
  someFunction(e){
    alert('sdsa');
  }
}
