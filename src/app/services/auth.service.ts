import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from '../services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private token :TokenService,) { }

  //السيرفيز دي معمولة عشان اقدر اغير حالة اليوز بعد تسجيل الخروج  واعرف الصفحات التانية انه سجل دخول او خروج
   Ehh : string;
   Nhh : string;
   hh : any;
  private loggedIn = new BehaviorSubject <boolean>(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();//ببعت الحالة بتاعته نيكست


  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }
  public getUserEmail(){
    return  this.Ehh;
  }

  public setUserEmail(){
   this.Ehh = 'dsfsdf';
  }
  public getUserName(){
     return this.Nhh ;
   }
  public setUserName(){
   this.Nhh = 'dsfsdfs';
  }



}
