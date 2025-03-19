import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  user: any;
  imageUrl: string = '';
  isEditing: boolean = false;
  editedUser: any = {}; 
  profileImage: File | null = null; 

  @ViewChild('content') content!: TemplateRef<any>;  

  constructor(private _HttpClient: HttpClient, private _ModalBootstrap: NgbModal, private fb: FormBuilder, private _Toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this._HttpClient.get('Users/currentUser/').subscribe(
      (response: any) => {
        this.user = response;
        this.editedUser = { ...this.user }; 
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

  editProfile(): void {
    this.isEditing = true;
    this._ModalBootstrap.open(this.content);
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (this.editedUser.password !== this.editedUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('userName', this.editedUser.userName);
    formData.append('email', this.editedUser.email);
    formData.append('country', this.editedUser.country);
    formData.append('phoneNumber', this.editedUser.phoneNumber);
    formData.append('password', this.editedUser.password);
    formData.append('confirmPassword', this.editedUser.confirmPassword);

    if (this.profileImage) {
      formData.append('profileImage', this.profileImage);
    }

    this._HttpClient.put('Users/', formData).subscribe(
      (response) => {
        this.isEditing = false;
        this.getUserData();
        this._Toastr.success('Profile updated successfully!', 'Success');
        this._ModalBootstrap.dismissAll();
      },
      (error) => {
        console.error('Error updating profile:', error);
        this._Toastr.error('Error updating profile!', 'Error');
      }
    );
  }
}
