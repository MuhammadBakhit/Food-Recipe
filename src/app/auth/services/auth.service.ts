import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) { 
    if(localStorage.getItem('userToken')!==null)
    this.getProfile();
  }


  getProfile(){
    let encoded:any = localStorage.getItem('userToken');
    let decoded:any = jwtDecode(encoded);

    localStorage.setItem('role', decoded.userGroup);

    console.log(decoded);
  }

  login(data: FormGroup):Observable<any>{
    return this._HttpClient.post('Users/Login/',data);
  }
  register(data: FormData):Observable<any>{
    return this._HttpClient.post('Users/Register/',data);
  }
  forgot(email: string): Observable<any> {
    return this._HttpClient.post('Reset/Request', { email });
  }
  resetRequest(email: string, otp: string, token: string, newPassword: string): Observable<any> {
    const body = { email, otp, token, newPassword }; 
    return this._HttpClient.post('Users/Reset', body);
  }
}
