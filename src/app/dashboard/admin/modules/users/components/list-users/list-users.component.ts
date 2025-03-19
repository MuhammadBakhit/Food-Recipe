import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersList: any[] = [];
  imageSrc: string = 'https://upskilling-egypt.com:3006/';
  constructor(
    private _usersService: UsersService,
    private _Toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
  
  
}
