import { Component, OnInit } from '@angular/core';
import { UserRecipesService } from '../services/user-recipes.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {
  favorites: any[] = [];
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
  constructor(
    private _UserRecipesService: UserRecipesService,
    private _Toasr: ToastrService,
    private _HttpClient: HttpClient
  ) { 
  }
  
  ngOnInit(): void {
    this._UserRecipesService.onGetFav().subscribe((res: any) => {
      const mappedData = res.data.map((item: any) => {
        return item;
      });
      console.log(mappedData);
      this.favorites = mappedData;
    });
  }


  removeFavorite(recipeId: number) {
    const recipeExists = this.favorites.some(fav => fav.recipe.id === recipeId);
    if (!recipeExists) {
      this._Toasr.error('Error Not Found recipe', 'Error');
      return;
    }
  
    console.log('Deleting recipe with ID:', recipeId);
  
    this._UserRecipesService.onDeleteFav(recipeId).subscribe({
      next: (response) => {
        console.log('API Response:', response);

        this.favorites = this.favorites.filter(fav => fav.recipe.id !== recipeId);
        this._Toasr.success('Successfully deleted recipe', 'Success');
      },
      error: (err) => {
        console.error('Error removing recipe:', err);
        this._Toasr.error('Error removing recipe', 'Error');
      }
    });
  }
  
  
  
  
}