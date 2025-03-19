import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRecipesService {
  constructor(
    private _HttpClient: HttpClient,
  ) { }




  onAddFav(id:number):Observable<any>{
    return this._HttpClient.post('userRecipe/',{recipeId:id});
  }

  onGetFav():Observable<any>{
    return this._HttpClient.get('userRecipe/');
  }

  onDeleteFav(id:number|undefined):Observable<any>{
    return this._HttpClient.delete(`userRecipe/${id}`);
  }
  
}
