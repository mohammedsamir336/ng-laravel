import { Component, OnInit, AfterViewInit, Input, Output, } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';//الترجمة
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { CallApiService } from "../services/call-api.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private myRouter: Router,
    public translate: TranslateService,
    private auth: AuthService,
    private token: TokenService,
    private call: CallApiService,
    private location: Location
  ) {
    translate.addLangs(['en', 'fr', 'ar']); //lang in select option

    // this language will be used as a fallback when a translation isn't found in the current language
    const browserLang = translate.getBrowserLang();// get browser local language
    translate.setDefaultLang(browserLang);//set the browser local language by default


    // do something when choose one of the select lang
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      let setLang = event.lang;
      //this.browserLang = event.lang;
      localStorage.setItem('lang', setLang);// lang local Storage
    });

    let lang = localStorage.getItem('lang');
    if (lang) {  // check if lang local Storage found
      translate.use(lang);// بستدعي السيشن  معايا وبستعمل اللغة اللي فيها عشان لما الصفحة تعمل ريلود متتغيرش اللغة
    } else {
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');
    }

  }

  public loggedIn: boolean;// check auth
  userName: string;// get auth name
  //userName: Observable<any>;
  //testObservable:any;

  /*send token to call api services to get auth data
  */
  public form = {
    tok: null,
  };


  getUserFromApi() {
    let g = this.token.get();
    if (this.loggedIn) { //chech token and login
      this.form.tok = g.split('.')[1] + 'Y9';
      this.callAuth();
    }
  }

  /*get user data from api
  */
  callAuth() {
    this.call.userData(this.form).subscribe(
      data => this.setUserD(data),
      error => console.log(error)

    );
  }

  /*set user data (handle)
  */
  setUserD(data) {
    this.userName = data.name;
    /*this.userName =  new Observable(observer => {
        observer.next(data.name);

   }).subscribe(
         next => {
             this.testObservable = next;//observableاطبع الداتا اللي جاية من
         },

       )*/
  }



  logOut(e) { //for logout
    //e.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.myRouter.navigateByUrl('/login');
    return false;
  }


  googleAr() {
    document.cookie = "googtrans=/en/ar; path=/";
    /*search get and check cookie*/
  }

  googleEn() {
    document.cookie = "googtrans=/en/en; path=/";
  }

  /*when page component
   */
  ngOnInit(): void {

    //this.url = location.pathname.replace('/', '');//part one of URL without slash
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    this.getUserFromApi();

  }

  /*when leave component
  */
  ngOnDestroy() {

  }

  /*after load component
  */
  ngAfterViewInit() {


  }

  intervalFun() {
    /*var timesRun = 0;
    var interval = setInterval(() => {
      timesRun += 1;
      if (timesRun === 3) {
        clearInterval(interval);
      }
      let g = this.token.get();

      if (this.loggedIn) {
        this.form.tok = g.split('.')[1] + 'Y9';
        console.log(this.form.tok);

        this.call.userData(this.form).subscribe(
          data => this.ff(data),//بخزن الداتا اللي راحت عشان اعرضها تلقائي من غير تحميل الصفحة
          error => console.log(error)//ngIfبدي للفانشن دي الخطأ عشان احطه في المتغير  وابعته علي الصفحة من خلال

        );
      }
    }, 3000);*/
    //setInterval(this.rr,1000);
  }


  /*to add class acive to li of page For the page I'm on
  */
  /*active(url) {
    //console.log(window.location.pathname);//part tow afrter slah of URL
    //  console.log(window.location.origin);//part one afrter slah of URL
  }*/

}
