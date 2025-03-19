import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../change.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  isHide: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private _FormBuilder: FormBuilder, private _ChangePasswordService: ChangePasswordService,
    private _Toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
  }

  formPassword = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

onSendData(data : FormGroup){
  if (this.formPassword.invalid) {
    this._Toastr.error('Please enter a valid password.');
    return;
  }
  this._ChangePasswordService.changePassword(data.value).subscribe({
    next: (res) =>{ 
      console.log(res);
      this._Toastr.success('change password successfully');
    },
    error: (err) => {
      console.error('Error response:', err);
      this._Toastr.error(err.error.message || 'Something went wrong.')
    },
    complete: () => {
      this._Router.navigate(['/auth']);
    }
  }
  );
}

}
