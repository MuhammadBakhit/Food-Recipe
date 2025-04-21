import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategoryData, IgetCategoryParams } from '../../models/categories';
import { EditAddComponanetComponent } from '../edit-add-componanet/edit-add-componanet.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
})
export class ListCategoriesComponent {
  tabelParams:IgetCategoryParams = {
    pageSize: 10,
    pageNumber: 1,
  }  
  categoriesList!: ICategoryData[];
  tabelRes:any;
  constructor(
    private _CategoriesService:CategoriesService, 
    public dialog: MatDialog,
    private _ToastrService:ToastrService
  ){
    this.onGetgCategoriesDate();
  }

  onGetgCategoriesDate(){
    this._CategoriesService
    .onGettingCategories(this.tabelParams)
    .subscribe((res)=>{
      this.categoriesList = res.data;
      this.tabelRes = res;
      this.tabelParams={
        pageNumber: res.pageNumber,
        pageSize: res.pageSize,
      }
    });
  }


  onOpenAddDialog(): void{
    const dialogRef = this.dialog.open(EditAddComponanetComponent,{
      data: {
        name: '',
      }
    });


    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.onAddCatrgory(result.name)
      }
    });
  }
  onAddCatrgory(categoryName: string): void{
    const payload ={
      name: categoryName
    };
    this._CategoriesService.onAddCategory(payload).subscribe({
      next:(res)=>{
        this._ToastrService.success(`Category ${res.name} Added Successfully`)
        
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message,' Error')
      },
      complete:()=>{
        this.onGetgCategoriesDate();
      },
    });
  }
  onEditDialog(category:ICategoryData): void{
    const dialogRef = this.dialog.open(EditAddComponanetComponent,{
      data:{
        name:category.name,
      },
    });

    dialogRef.afterClosed().subscribe((result)=>{
      this.onEditCategory(category.id, result.name)
    })
  }
  onEditCategory(id:number|undefined, categoryName:string):void{ 
    this._CategoriesService.onUpdateCategory(id,categoryName).subscribe({
      next:(res)=>{
        this._ToastrService.success(`Category ${res.name} Updated Successfully`)
        
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message,' Error')
      },
      complete:()=>{
        this.onGetgCategoriesDate();
      },
    })
  }
  onViewDialog(category:ICategoryData): void{
    const dialogRef = this.dialog.open(EditAddComponanetComponent,{
      data:{
        name:category.name,
        isView: true
      }
    });
  }
  onDeleteDialog(category:ICategoryData): void{
    const dialogRef = this.dialog.open(DeleteItemComponent,
      {
        data: {
          name: category.name,
          type: 'Category'
        }
      }
    );

    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        this.onDeleteCategory(category.id)
      }
    });
  }
  onDeleteCategory(id:number|undefined):void{
    this._CategoriesService.onDeleteCategory(id).subscribe({
      next:(res)=>{      
        this._ToastrService.success(`Category Deleted Successfully`)
      },
      error:(err)=>{
        this._ToastrService.error(`Category ${err.error.message}`,' Error')
      },
      complete:()=>{
        this.onGetgCategoriesDate();
      },
    })
  }


  onPageChange(event: any):void { 

   this.tabelParams={
     pageSize: event.pageSize,
     pageNumber: event.pageIndex + 1,
   }

   this.onGetgCategoriesDate();
  }

}
