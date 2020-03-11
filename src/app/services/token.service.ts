import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor() { }

  gg(){
    console.log('from token servies');
  }
}
