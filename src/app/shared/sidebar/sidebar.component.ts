import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface IMenu {
  title: string;
  icon: string;
  menuLink?: string;
  isActive: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: IMenu[] = [];
  isMini: boolean = false;
  constructor(private router: Router,
    private _Toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.menu = [
      { title: 'home', icon: 'fa-house-user', menuLink: '/dashboard', isActive: this.isAdmin() || this.isUser() },
      { title: 'Users', icon: 'fa-users', menuLink: '/dashboard/admin/users', isActive: this.isAdmin() },
      { title: 'Recipes', icon: 'fa-braille', menuLink: '/dashboard/admin/recipes', isActive: this.isAdmin() },
      { title: 'Recipes', icon: 'fa-braille', menuLink: '/dashboard/user/user-recipes', isActive: this.isUser() },
      { title: 'Categories', icon: 'fa-list', menuLink: '/dashboard/admin/categories', isActive: this.isAdmin() },
      { title: 'Change Password', icon: 'fa-lock-open', menuLink: '/dashboard/admin/change-password', isActive: this.isAdmin() },
      { title: 'Favorites', icon: 'fa-heart', menuLink: '/dashboard/user/fav', isActive: this.isUser() },
      { title: 'Logout', icon: 'fa-right-to-bracket', action: () => this.logOut(), isActive: this.isAdmin() || this.isUser() }
    ];



    const savedSidebar = localStorage.getItem('sidebar');
    if (savedSidebar === 'true') {
      this.isMini = true;
    };
    
  }
  logOut(): void {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/auth']);
      this._Toastr.success('Logout Successful!', 'Success');
    }, 700);
  }
  
  toggleSidebar() {
    this.isMini = !this.isMini;
    localStorage.setItem('sidebar', this.isMini.toString());
  }

  
  isAdmin() {
    return localStorage.getItem('role') === 'SuperAdmin';
  }

  isUser() {
    return localStorage.getItem('role') === 'SystemUser';
  }
}

