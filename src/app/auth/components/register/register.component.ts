import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isHide: boolean = true;
  srcImg: any;
  files: File[] = [];
  userEmail: string | null | undefined;

  registerForm = new FormGroup({
    userName: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[A-Za-z]+[0-9]+$')
    ]),
    country: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string | null>(null, [
      Validators.required,
      Validators.pattern('^01[0-9]{9}$')
    ]),
    profileImage: new FormControl<File | null>(null, [Validators.required])
  });
  constructor(private _AuthService: AuthService, private _Toastr: ToastrService , private _Router: Router) {}

  sendData(data: FormGroup) {
    if (data.invalid) {
      this._Toastr.error('Please fill all required fields correctly.', 'Error');
      return;
    }



  let newData = new FormData();
  newData.append('userName', this.registerForm.value.userName!);
  newData.append('country', this.registerForm.value.country!);
  newData.append('password', this.registerForm.value.password!);
  newData.append('email', this.registerForm.value.email!);
  newData.append('phoneNumber', this.registerForm.value.phoneNumber!);
  newData.append('confirmPassword', this.registerForm.value.confirmPassword!);
  newData.append('profileImage', this.files[0]);
  
    this._AuthService.register(newData).subscribe({
      next: (res) => {
        console.log(res);
        this._Toastr.success('Registered Successfully', 'Success');
  
        // ✅ التوجيه إلى صفحة التحقق مع إرسال الإيميل
        this._Router.navigate(['/auth/verify'], { state: { userEmail: this.userEmail } });
      },
      error: (err) => {
        console.log(err);
        this._Toastr.error(err.error.message, 'Error');
      }
    });
  
    console.log(data.value);
  }
  
  // Password matching validation
  passwordMatchValidator(control: FormControl) {
    const formGroup = control?.parent as FormGroup;
    const password = formGroup?.get('password')?.value;
    const confirmPassword = formGroup?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsDoNotMatch: true };
    }
    return null;
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.srcImg = this.files[0];

    // ✅ ربط الصورة بالفورم
    this.registerForm.patchValue({
      profileImage: this.files[0]
    });
    this.registerForm.get('profileImage')?.markAsTouched();
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

    if (this.files.length === 0) {
      this.registerForm.patchValue({
        profileImage: null
      });
      this.registerForm.get('profileImage')?.markAsTouched();
    }
  }
}
