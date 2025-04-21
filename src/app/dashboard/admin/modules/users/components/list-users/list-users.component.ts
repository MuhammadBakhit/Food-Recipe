import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteItemComponent } from 'src/app/shared/components/delete-item/delete-item.component';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from '../../../recipes/services/recipes.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { IUserData } from '../../interface/users';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersList: any[] = [];
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
  constructor(
    public _MatDialog: MatDialog,
    private _usersService: UsersService,
    private _Toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGitUsersDate()
  }

  onGitUsersDate(): void {
    this._usersService.onGettingUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.usersList = res.data || [];
      },
      error: () => {
        this._Toastr.error('An error occurred', 'Error');
      }
    });
  }
  


    onDeleteDialog(user:IUserData): void{
      const dialogRef = this._MatDialog.open(DeleteItemComponent,
        {
          data: {
            name:  user.userName,
            type: 'User'
          }
        }
      );
  
      dialogRef.afterClosed().subscribe((result)=>{
        if (result) {
          console.log(user);
          this.onDeleteUser(user.id)
        }
      });
    }
  
    onDeleteUser(id:number|undefined):void{
      this._usersService.onDeleteUser(id).subscribe({
        next:(res)=>{      
          this._Toastr.success(`User Deleted Successfully`)
        },
        error:(err)=>{
          this._Toastr.error(`User ${err.error.message}`,' Error')
        },
        complete:()=>{
          this.onGitUsersDate();
        },
      })
    }




    onViewDialog(view: IUserData): void {
      const dialogRef = this._MatDialog.open(ViewUserComponent, {
        width: '600px',
        height: '550px',
        data: view  // تمرير البيانات كاملة
      });
    
      dialogRef.afterClosed().subscribe(() => {
        console.log('Dialog was closed');
      });
    }
    
  
  
}
