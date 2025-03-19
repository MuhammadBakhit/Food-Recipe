import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isHide: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl(null ,[Validators.required, Validators.email]),
    password: new FormControl(null ,[Validators.required, Validators.minLength(6)])
  }); 
  constructor(
    private _AuthService:AuthService,
    private _Toastr: ToastrService,
    private _Router: Router
  ){

  }
  sendData(data: FormGroup){
    if (!this.loginForm.value.email) {
      this._Toastr.error("Please enter a valid email address!");
      return;
    }
    this._AuthService.login(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken',res.token);
        this._AuthService.getProfile();
      },
      error:(err)=>{
        console.log(err);
        this._Toastr.error(err.error.message, 'Error');
      },complete:()=>{
        this._Router.navigate(['/dashboard']);
        this._Toastr.success('Login Successfully', 'Success');
      }
    });
    console.log(data.value);
  }
}
