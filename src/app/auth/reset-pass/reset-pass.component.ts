import { Component, OnInit } from '@angular/core';
import { CallApiService } from "../../services/call-api.service";
import { TokenService } from '../../services/token.service';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  constructor(
    private call: CallApiService,
    private token: TokenService,
    private myRouter: Router,
    private route: ActivatedRoute,
    private notify: SnotifyService
  ) {
    // get from url
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
      this.form.email = params['email'];
    });
  }

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  dataUsers: any;

  errors = {
    email: null,
    password: null
  };

  resendError: string;//token or email Invalid
  messError: string; //error of validation


  /* on blur add class
  */
  emailInvalid() {
    let emailId = document.querySelector('#email');
    if (this.form.email && this.errors.email) {
      emailId.classList.remove("is-invalid");
    }
    emailId.classList.add("is-invalid");
  }


  ngOnInit(): void {
  }


  redirectPages(page) {
    this.myRouter.navigateByUrl(page);
  }


  /*user data if success
  */
  dataUser(data) {
    this.notify.info('Waiting... , Change Password', { timeout: 3000 });
    setTimeout(() => {
      this.notify.success(data.data, { timeout: 0 });
      this.myRouter.navigateByUrl('/login');
    }, 4000);
    /*this.notify.confirm('Email sent Successfully', {
      buttons: [
        { text: 'ok', action: toster => { this.redirectPages('/login') }, bold: true },
      ]
    });*/

  }

  /*get error message for email and password
  */
  getErrorFromApiCangePassLaravel(error) {

    if (!error.error.error) {
      this.errors = error.error.errors;
    }
    //this.notify.error(this.resendError);

  }

  /*let me know if token or email Invalid
  */
  errorTokenAndEmail(errorToken) {
    this.resendError = errorToken.error.error;
    this.notifyErrorToken();
  }

  /*notify error token
  */
  notifyErrorToken() {
    if (this.resendError) {

      this.notify.confirm('Token or Email is Incorrect Please resend new password link', {
        buttons: [
          {
            text: 'ok', action: toster => {
              this.redirectPages('/restPass')
                , this.notify.remove(toster.id)//delete message after redirect
            }
            , bold: true
          },
          {
            text: 'No', action: toster => {
              console.log('no')
                , this.notify.remove(toster.id)
            }
            , bold: true
          },
        ]
      });
      //this.notify.error(errorToken.error.error);
    }
  }

  /*error of validation
  */
  errorMessage(errorMess) {
    this.messError = errorMess.error.message;
    if (this.messError) {
      this.notify.error(errorMess.error.message);
    }
  }

  /*Change  user Password
  */
  changePassword() {
    this.call.sendChangePassword(this.form).subscribe(
      data => this.dataUser(data),
      error => [
        this.getErrorFromApiCangePassLaravel(error),
        this.errorTokenAndEmail(error),
        this.errorMessage(error)//error of validation
      ],

    );
  }

}
