import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) {}

  onGettingUsers(): Observable<any> {
    return this._HttpClient.get(`Users/`);
  }

  updateUser(data:FormData):Observable<any>{
    return this._HttpClient.put('/Users', data);
  }
  getCurrentUser(): Observable<any> {
    return this._HttpClient.get('/Users/currentUser');
  }

  onDeleteUser(id:number|undefined):Observable<any>{
    return this._HttpClient.delete(`Users/${id}`);
  }

}
