import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  imageUrl: string = '';

  constructor(private _HttpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this._HttpClient.get('Users/currentUser/').subscribe(
      (response: any) => {
        this.user = response;
        if (this.user.imagePath) {
          this.imageUrl = `https://upskilling-egypt.com:3006/${this.user.imagePath}`;
        } else {
          this.imageUrl = 'assets/default-user.png';
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
