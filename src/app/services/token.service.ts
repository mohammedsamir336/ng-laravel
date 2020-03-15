import { Injectable } from '@angular/core';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  //بعمل الاوبجيكت ده عشان اتاكد ان التوكن جي من العنوانين دول محدش دخل التوكن بايده
  private iss = {
    login: 'http://localhost:8080/ngLaravel/public/api/login',
    signup: 'http://localhost:8080/ngLaravel/public/api/singup'
  }

  constructor(private router: Router){}

  getData(token){
    this.set(token); // و ببعتها علي الفانشن اللي تحت عشان اخزنهاهنا استلمت التوكن اللي جاية من صفحة اللوجن سين ان
    //console.log(this.tokkenTrue());

  }

  set(token){
     localStorage.setItem('token', token);//خزنتها في سيشن
  }


  get(){
    return localStorage.getItem('token');//عشان اجيب التوكن المتخزنة وممكن اعملها مع اي حاجة حتي اللغة المتخزنة ممكن اجبها
    //return localStorage.getItem('lang');
  }

  remove(){
     localStorage.removeItem('token');//عشان امسحها
  }

  //كل الفانشنات اللي جاية عشان اتحقق من التوكن والرابط اللي جايه منه عشان محدش يحطها بايده
  tokkenTrue(){
    const token = this.get();
    if (token) {
      const payLoad = this.payLoad(token);
      if (payLoad) {
        return Object.values(this.iss).indexOf(payLoad.iss) > -1 ? true : false;//لو اي رابط من اللي فوق متتابق مع الرابط اللي جي منه التوكن خليها ترو
      }
    }
    return false;
  }


  payLoad(token){
    const payLoad = token.split('.')[1];//يعني التوكن اللي جاية هات اللي بعد النقطة
    return this.decode(payLoad);
  }

  decode(payLoad){
    //console.log(payLoad);
    /*المتغير ده هو التوكن المبعوت لو حد حطه بايدي بقولة حاول تبعتي الجيسن عشان تعرفني التوكن جاية منين
    لو لقيت فيه خطأ ومحطوطة بالايد رجعلي الخطأ*/

      try {
    return JSON.parse(atob(payLoad));//هتلي الرابط اللي جاية منه التوكن عشان اطابقه مع الرابط اللي فوق

   } catch(e) {
      console.log('your tokken is invaild'); // error in the above string (in this case, yes)!
      //console.log(e);
   }
      //let data = JSON.parse(JSON.stringify(payLoad.trim()));//لو محطوطة بالايد وفيها نقط
      //return atob(data);
  }

  loggedIn(){
    return this.tokkenTrue(); //هتجبلي ترو او فولس
  }

  /*split token for put in DB
  */
  splitToken(){
    let data = this.get();
    if (this.tokkenTrue()) {
    return data.split('.')[1]+'Y9';
    }

  }


  //الفانشن دي عاملتها عشان ميرحش العميل للصفحة معينة غير لما يعمل لوجن انا حططها في اب روت مع الباس
  canActivate() {
  let tokken = this.tokkenTrue();
    if (tokken) {

      return true;// لما تبقي صح يروح صفحة هوم بعدين روح انت حط في الروت بتاع الهوم اسم السيرفز دي عشان ميروحش غير لما يبقي فيه توكنsigninهشوف لو بعت صح انا عامل فنشن في

    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
