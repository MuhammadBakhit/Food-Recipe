// verify.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  isLoading: boolean = false;
  email: string | null = null;

  verifyForm = new FormGroup({
    verificationCode: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  });

  constructor(
    private _AuthService: AuthService, 
    private _Toastr: ToastrService, 
    private _Router: Router
  ) {}

  ngOnInit() {
    const navigation = this._Router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string } | undefined;

    if (state?.email) {
      this.email = state.email;
      console.log("Email received:", this.email); // للتحقق من استلام الـ email
    } else {
      // this._Toastr.error("Email is missing.");
      // console.error("Email is missing.");
      this._Router.navigate(['/auth/login']);
    }
  }

  verifyCode() {
    const verificationCode = this.verifyForm.value.verificationCode;
    
    if (verificationCode && typeof verificationCode === 'string') {
      if (this.email && this.verifyForm.valid) {
        this.isLoading = true;
        this._AuthService.verifyEmail(this.email, verificationCode).subscribe({
          next: (res) => {
            this._Toastr.success("Your email has been verified successfully.");
            this._Router.navigate(['/auth/login']);
          },
          error: (err) => {
            this._Toastr.error("Verification failed, please try again.");
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } else {
        this._Toastr.error("Email is invalid or missing.");
      }
    } else {
      this._Toastr.error("Please enter a valid verification code.");
    }
  }
}
