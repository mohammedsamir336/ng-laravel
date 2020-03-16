import { Component, OnInit } from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import { CallApiService } from "../../services/call-api.service";

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {

  constructor(
      private notify: SnotifyService,
      private call: CallApiService,
  ) { }

  public form = {
    email: null,
  };

  error: string;

  dataUser(data) {

    //notify
    this.notify.info('Waiting..., Sending Email', {timeout:5000});
    setTimeout(() => {
    this.notify.success(data.data, {timeout:5000});
  }, 6000);

  }

  /*getError(error?) {
    if (!error.error.error) {
     this.notify.info('Wait, Sending Email', {timeout:5000});
    }

  }*/

  sendPassRest(){
    this.call.senPasswordRestLink(this.form).subscribe(
      data => this.dataUser(data),
      error => this.notify.error(error.error.error)
    );



  }
  ngOnInit(): void {
  }

}
