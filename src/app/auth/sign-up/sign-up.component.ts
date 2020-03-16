import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from "../../services/call-api.service";
import { TokenService } from '../../services/token.service';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
  private http: HttpClient,
  private call: CallApiService,
  private token :TokenService,
  private myRouter: Router,
  public auth: AuthService,
  private notify: SnotifyService,
  ) { }

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  dataUsers: any;
  errors = {
    email: null,
    name: null,
    password: null
  };

  /*on blur
  */
  emailValid(){
      this.call.signUp(this.form).subscribe(
        data => this.dataUser(data),//بخزن الداتا اللي راحت عشان اعرضها تلقائي من غير تحميل الصفحة
        error => this.errors.email = error.error.errors.email

      );
    }

    redirectPages(page){
      this.myRouter.navigateByUrl(page);
    }

    dataUser(data) {
      this.token.getData(data.access_token);//بحط الدتا اللي جاية في السيرفيز توكن اللي عملتها
     this.notify.success(`thank you for your register ${data.user}`);
      this.auth.changeAuthStatus(true);// let auth services know that user has login
      this.redirectPages('/home');
      location.reload();
      //this.dataUsers = data.email;
    }

    getErrorFromApisignUpLaravel(error) {
      this.errors = error.error.errors;
    }

    register(){

      this.call.signUp(this.form).subscribe(
        data => this.dataUser(data),//بخزن الداتا اللي راحت عشان اعرضها تلقائي من غير تحميل الصفحة
        error => this.getErrorFromApisignUpLaravel(error) //[this.getErrorFromApisignUpLaravel(error),this.emailValid(error)]//ngIfبدي للفانشن دي الخطأ عشان احطه في المتغير  وابعته علي الصفحة من خلال

      );
    }


    ngOnInit(): void {
      //بقوله لو في توكن بجد وجاية من الرابط صح وديني علي الهوم عشان كدا هيبقي يوزر الفانشن دي في سيرفيز توكن
      let tokken = this.token.tokkenTrue();//لو فيه سيشن وواخده توكن موجود نفذ حاجة
      if (tokken) {
        this.myRouter.navigateByUrl('/home');
        //this.myRouter.navigate(['/home']);// لما تبقي صح يروح صفحة هوم بعدين روح انت حط في الروت بتاع الهوم اسم السيرفز دي عشان ميروحش غير لما يبقي فيه توكنsigninهشوف لو بعت صح انا عامل فنشن في
        //return false;//عشان يروح علي الصفحة بسرعة ملهاش دعوة باي للحاجة
      }

    }


}
