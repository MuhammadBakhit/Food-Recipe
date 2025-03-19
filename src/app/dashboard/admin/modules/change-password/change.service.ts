import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(private _HttpClient: HttpClient) { }
 
  changePassword(data: FormData): Observable<any> {
    return this._HttpClient.put('Users/ChangePassword/', data ,);
  }
}


