import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss']
})
export class ResetRequestComponent {
  isHide: boolean = true;

  email: string = ''; 
  seed: string = '';
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  isLoading: boolean = false;

  resetForm = new FormGroup({
    email: new FormControl(null ,[Validators.required, Validators.email]),
    seed: new FormControl(null ,[Validators.required, Validators.minLength(3)]),
    password: new FormControl(null ,[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null ,[Validators.required, Validators.minLength(6)])
  }); 
  constructor(private _AuthService:AuthService, private _Toastr: ToastrService, private _ActivatedRoute: ActivatedRoute){

  }


  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token);
    });
  }
  

  resetPassword() {
    if (this.password !== this.confirmPassword) {
      this._Toastr.error('Passwords do not match');
      return;
    }
    if (!this.token) {
      this._Toastr.error('There is no valid token');
      return;
    }
    this.isLoading = true;
    this._AuthService.resetRequest(this.email, this.seed, this.token, this.password).subscribe({
      next: () => {
        this._Toastr.success('Done', 'Success');
      },
      error: (err) => {
        console.error('Error:', err);  
        if (err.status === 400) {
          this._Toastr.error('token is not valid');
        } else {
          this._Toastr.error('An error occurred, please try again.');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
}