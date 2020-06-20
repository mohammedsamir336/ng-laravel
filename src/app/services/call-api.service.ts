import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; //عشان انظم الداتا اللي جاية من ايه بي اي
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  constructor(private http: HttpClient) { }

    private url = 'http://localhost:8080/ngLaravel/public/api';

    //call api
    callApi(){
       return this.http.get('https://jsonplaceholder.typicode.com/posts');
       //.pipe(map(result => result));
    }

    LogIn(data){
        return this.http.post(`${this.url}/login`, data);
       //.pipe(map(result => result));
    }

    signUp(data){
      return this.http.post(`${this.url}/singup`, data);
       //.pipe(map(result => result));
    }
    /*registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/register', user, { headers: headers });
  }*/
  senPasswordRestLink(data){
    return this.http.post(`${this.url}/restPasswordLink`, data);
     //.pipe(map(result => result));
  }


  sendChangePassword(data){
    return this.http.post(`${this.url}/changePassword`, data);
     //.pipe(map(result => result));
  }

  userData(data){
    return this.http.post(`${this.url}/me`, data);

  }

  /*for get Producer Sale from offers table
  */
  offersData(){
    return this.http.get(`${this.url}/offers`);

  }

  /*set rating into DB
  */
  setRating(data){
    return this.http.post(`${this.url}/setRating`, data);

  }

  /*get rating into DB
  */
  getRating(data){
    return this.http.post(`${this.url}/getRating`, data);

  }

  /*get one product for view more
  */
  viewMore(data){
    return this.http.post(`${this.url}/viewMore`, data);

  }

  /*get all products data
  */
  shop(data){
    return this.http.post(`${this.url}/allShop`, data);

  }
  /*get all products data
  */
  produtsFilter(data){
    return this.http.post(`${this.url}/produtsFilter`, data);

  }

  /*set product in cart DB
  */
  setCart(data){
    return this.http.post(`${this.url}/setCart`, data);

  }
  /*get product in cart DB
  */
  getCart(data){
    return this.http.post(`${this.url}/getCart`, data);

  }

  /*delete product in cart DB
  */
  deleteCart(data){
    return this.http.post(`${this.url}/deleteCart`, data);

  }
  /*next and prev pages
  */
  paginateUrl(data){
    return this.http.post(data, data);
  }

  /* get total of price and count of customer cart for navbar
  */
  getTotalPriceForNav(data){
    return this.http.post(`${this.url}/navTotalPrice`, data);
  }

  /* data fro checkout
  */
  checkOutData(data){
    return this.http.post(`${this.url}/checkOutData`, data);
  }

  /* search
  */
  search(data){
    return this.http.post(`${this.url}/search`, data);
  }

  /* search
  */
  searchPaginate(data){
    return this.http.post(`${this.url}/${data}`, data);
  }

  /*comments in view more page
  */
  setComments(data){
      return this.http.post(`${this.url}/setComments`, data);
    }

    /* get comments in view more page
    */
    getComments(data){
        return this.http.post(`${this.url}/getComments`, data);
      }

      /* load more comments button in view
      */
       MoreComments(data){
          return this.http.post(`${this.url}/MoreComments`, data);
        }

}
