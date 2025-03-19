import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  isLoading: boolean = false;
  token: string | null = null;

  requestForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor(private _AuthService: AuthService, private _Toastr: ToastrService , private _Router: Router) {}

  sendReset() {
    if (!this.requestForm.value.email) {
      this._Toastr.error("Please enter a valid email address!");
      return;
    }
    this.isLoading = true;
    const email = this.requestForm.value.email;
    this.token = 'your-token-here';
    this._AuthService.forgot(email).subscribe({
      next: () => {
        this._Toastr.success("A reset link has been sent to your email.");
        this._Router.navigate(['/auth/reset-request'],{ queryParams: { token: this.token } });
      },
      error: () => {
        this._Toastr.error("An error occurred, please make sure the email is correct.");
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
}
