import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { IgetRecipeParams } from '../../models/recipe';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ICategoryData } from '../../../categories/models/categories';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit{
  tabelParams:IgetRecipeParams = {
    pageSize: 10,
    pageNumber: 1,
    name: '',
    tagId: 0,
  }  
  recipesList: any[] = [];
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
  tagList:any[] = [];
  categoriesList: any[] = [];
  searchName:string = "";
  tagId: number = 0;
  categId: number =0;
  tabelRes:any;

  constructor(
    private _RecipesService: RecipesService,
    private _HelperService:HelperService,
    private _ToastrService:ToastrService,
    public dialog: MatDialog
  ){
    this.onGetgRecipesDate();
    this.onGetTag();
    this.onGetCategories();
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

  onGetTag():void{
    this._HelperService.onGettingTags().subscribe({
      next:(res)=>{
        this.tagList = res;
      }
    })
  }


  onGetCategories():void{
    const categoriesParams = {
      pageSize: 1000,
      pageNumber: 1
    };

    this._HelperService.onGetCategories(categoriesParams).subscribe((res)=>{
      this.categoriesList = res.data;
    })

  }

  onDeleteDialog(recipe:ICategoryData): void{
    const dialogRef = this.dialog.open(DeleteItemComponent,
      {
        data: {
          name: recipe.name,
        }
      }
    );

    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.onDeleteRecipe(recipe.id)
      }
    });
  }

  onDeleteRecipe(id:number|undefined):void{
    this._RecipesService.onDeleteRecipe(id).subscribe({
      next:(res)=>{      
        this._ToastrService.success(`Recipe Deleted Successfully`)
      },
      error:(err)=>{
        this._ToastrService.error(`Recipe ${err.error.message}`,' Error')
      },
      complete:()=>{
        this.onGetgRecipesDate();
      },
    })
  }

  clearFilters(){
    this.searchName='';
    this.tagId=0;
    this.categId=0;
    this.onGetgRecipesDate();
  }

}
