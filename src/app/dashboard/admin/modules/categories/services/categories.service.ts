import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IgetCategoryParams } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseURL = 'https://upskilling-egypt.com:3006/api/v1/';

  constructor(private _HttpClient: HttpClient) {}

  onGettingCategories(params: IgetCategoryParams): Observable<ICategory> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this._HttpClient.get<ICategory>(
      `${this.baseURL}Category/`,
      { params: { pageSize: params.pageSize, pageNumber: params.pageNumber }, headers }
    );
  }

  onAddCategory(data: any):Observable<any>{
     return this._HttpClient.post('Category/',data)
  }

  onUpdateCategory(id:number | undefined,categoryName: string):Observable<any>{
    return this._HttpClient.put(`Category/${id}`,{name:categoryName});
  }
  onDeleteCategory(id:number|undefined):Observable<any>{
    return this._HttpClient.delete(`Category/${id}`);
  }
}

