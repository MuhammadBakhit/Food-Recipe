import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isHide: boolean = true;
  srcImg: any;
  files: File[] = [];

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    country: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern('^01[0-9]{9}$')
    ]),
    profileImage: new FormControl(null , [Validators.required])
  });

  constructor(private _AuthService: AuthService, private _Toastr: ToastrService) {}

  sendData(data: FormGroup) {
    if (data.invalid) {
      this._Toastr.error('Please fill all required fields correctly.', 'Error');
      return;
    }

    if (data.value.password !== data.value.confirmPassword) {
      this._Toastr.error('Passwords do not match.', 'Error');
      return;
    }

    let newData = new FormData();
    newData.append('userName', data.value.userName);
    newData.append('country', data.value.country);
    newData.append('password', data.value.password);
    newData.append('email', data.value.email);
    newData.append('phoneNumber', data.value.phoneNumber);
    newData.append('confirmPassword', data.value.confirmPassword);
    newData.append('profileImage', this.files[0]);

    this._AuthService.register(newData).subscribe({
      next: (res) => {
        console.log(res);
        this._Toastr.success('Registered Successfully', 'Success');
      },
      error: (err) => {
        console.log(err);
        this._Toastr.error(err.error.message, 'Error');
      }
    });

    console.log(data.value);
  }

onSelect(event: any) {
  console.log(event);
  this.files.push(...event.addedFiles);
  this.srcImg = this.files[0];
}

onRemove(event: any) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
  
}