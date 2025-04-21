import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRecipesService } from '../../services/user-recipes.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ViewComponent>,
  private _UserRecipesService: UserRecipesService,
  private _ToastrService:ToastrService
){}



onAddToFav(id: number): void {
  this._UserRecipesService.onAddFav(id).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success(`Recipe Added To Favorites Successfully`);
      this.dialogRef.close();
    },
    error: (err) => {
      console.error(err); // 🔍 اعرض الخطأ الحقيقي هنا
      this._ToastrService.error(`Something went wrong`);
    }
  });
}

}
