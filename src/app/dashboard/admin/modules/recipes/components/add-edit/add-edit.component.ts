import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RecipesService } from '../../services/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  tagList:any[] = [];
  categoriesList:any[] = [];
  files: File[] = [];
  recipeId!:number|null; 
  isEditMode:boolean = false;
  isViewMode!: string | null;

recipeForm = new FormGroup({
  name: new FormControl(null),
  description : new FormControl(null),
  price : new FormControl(null),
  tagId : new FormControl(null),
  categoriesIds : new FormControl(null),
  recipeImage : new FormControl(null),
})
  
  constructor(
    private _HelperService:HelperService,
    private _RecipeService:RecipesService,
    private _Toastr:ToastrService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute
  ){
  this.recipeId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
  this.isViewMode = this._ActivatedRoute.snapshot.paramMap.get('formDisabled');
  this.onGetTag();
  this.onGetCategories();
  }

  ngOnInit(): void {
    if(this.recipeId){
      this.isEditMode = true; 
      this.onGetRecipeById(this.recipeId);
    }

    if (this.isViewMode) {
      this.recipeForm.disable();
    }
  }

  onSubmit(data: any):void{
    let myData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'recipeImage') {
        myData.append(key, data[key]);
      }
    });


    if (this.files.length > 0) {
      this.files.forEach((file) => {
        myData.append('recipeImage', file);
      })
    }
debugger
    if (!this.recipeId && !this.isEditMode) {
      this.onAddRecipe(myData);
    }else{
      this.onEditRecipe(myData);
    }
    
  }
  
  onAddRecipe(data:FormData):void{
    this._RecipeService.onAddRecipe(data).subscribe({
      next:(res)=>{
        this._Toastr.success('Recipe Added Successfully', 'Success');
      },
      error:(err)=>{
        console.log(err);
        this._Toastr.error(err.error.message, 'Error');
      },
      complete:()=>{
        this._Router.navigate(['/dashboard/admin/recipes']);
      }
    })

  }
  onEditRecipe(data:FormData):void{
    this._RecipeService.onUpdateRecipe(this.recipeId!,data).subscribe({
      next:(res)=>{
        this._Toastr.success('Recipe Added Successfully', 'Success');
      },
      error:(err)=>{
        console.log(err);
        this._Toastr.error(err.error.message, 'Error');
      },
      complete:()=>{
        this._Router.navigate(['/dashboard/admin/recipes']);
      }
    })

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


onGetRecipeById(recipeId:number):void{
  this._RecipeService.onGetRecipeById(recipeId).subscribe((res)=>{
    this.recipeForm.patchValue({
      name: res.name,
      description: res.description,
      price: res.price,
      tagId: res.tag? res.tag.id :null,
      categoriesIds: res.category.map((category: any) => category.id),
    });
  })
}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any ) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
} 
