import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../admin/modules/recipes/services/recipes.service';
import { IgetRecipeParams } from '../../admin/modules/recipes/models/recipe';
import { ToastrService } from 'ngx-toastr';
import { UserRecipesService } from '../services/user-recipes.service';
import { ViewComponent } from './view/view.component';
import { MatDialog } from '@angular/material/dialog';
import { ICategoryData } from '../../admin/modules/categories/models/categories';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit{
  tabelParams:IgetRecipeParams = {
    pageSize: 10,
    pageNumber: 1,
    name: '',
    tagId: 0,
  }  
  recipesList: any[] = [];
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
  searchName:string = "";
  tagId: number = 0;
  categId: number =0;

  constructor(
    private _RecipesService: RecipesService,
    private _UserRecipesService: UserRecipesService,
    private _ToastrService:ToastrService,
    private _MatDialog:MatDialog
  ){
    this.onGetgRecipesDate();
  }

  ngOnInit(): void {}

  onGetgRecipesDate(){

    const tableQuery = {
      pageSize: this.tabelParams.pageSize,
      pageNumber: this.tabelParams.pageNumber,
      name: this.searchName,
      tagId:this.tagId,
      categId:this.categId
    };

    this._RecipesService.onGettingRecipes(tableQuery).subscribe((res)=>{
      this.recipesList = res.data
    });
  }



  onAddToFav(id:number):void{
    this._UserRecipesService.onAddFav(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(`Recipe Added To Favorites Successfully`)
      },
    })
  }


    onViewDialog(category:ICategoryData): void{
      const dialogRef = this._MatDialog.open(ViewComponent,
        {
          data: {
            name: category.name,
            imagePath: category.imagePath,
            description: category.description,
          }
        }
      );
    }

}
