import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
constructor(
  private _HttpClient: HttpClient,
){ }

onGettingRecipes(data: any):Observable<any>{
  return this._HttpClient.get('Recipe/',{
    params: data
    });
}


onAddRecipe(data: FormData):Observable<any>{  
  return this._HttpClient.post('Recipe/',data); 
}

onGetRecipeById(recipeId:number):Observable<any>{   
  return this._HttpClient.get(`Recipe/${recipeId}`);
}

onUpdateRecipe(id:number,data: any):Observable<any>{  
  return this._HttpClient.put(`Recipe/${id}`,data); 
}

onDeleteRecipe(id:number|undefined):Observable<any>{
  return this._HttpClient.delete(`Recipe/${id}`);
}

}
