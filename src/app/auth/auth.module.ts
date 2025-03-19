import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetRequestComponent } from './components/reset-request/reset-request.component';
import { VerifyComponent } from './components/verify/verify.component';
@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    ForgotComponent,
    ResetRequestComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class AuthModule { }
