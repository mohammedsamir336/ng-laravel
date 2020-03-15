import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';//Validatorsعشان
import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from "../../services/call-api.service";
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private myRouter: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private call: CallApiService,
    private token: TokenService,
    public auth: AuthService
  ) { }

  public form = {
    email: null,
    password: null
  };

  dataUsers: any;

  error: string;

  @Output() userName: EventEmitter<any> = new EventEmitter();//send user name to nave component
  @Output() userEmail: EventEmitter<any> = new EventEmitter();//send email name to nave component


  getErrorFromApiLoginLaravel(error) {
    this.error = error.error.error;
  }

  dataUser(data) {
    this.token.getData(data.access_token);//send token to  token services
    this.auth.changeAuthStatus(true);// let auth services know that user has login
    //this.auth.setUserName(data.user);//send user name to auth service
    //this.auth.setUserEmail(data.email);
    //console.log(data.user);
    //this.myRouter.navigateByUrl('/home');
    location.reload();
  }

  /* send  form data to get user login
  */
  signIn() {
    this.call.LogIn(this.form).subscribe(
      data => this.dataUser(data),
      error => this.getErrorFromApiLoginLaravel(error)
    );
  }

  /* check login to block user from visiting this page
  */
  checkTok() {
    let token = this.token.tokkenTrue();
    token ? this.myRouter.navigateByUrl('/home')
          :console.log('No login');
  }

  ngOnInit(): void {
    this.checkTok();
  }

  ngOnDestroy() {
  }

}
