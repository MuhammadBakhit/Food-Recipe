import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangeComponent } from './change/change.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChangeComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule
  ],
})
export class ChangePasswordModule { }
