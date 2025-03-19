import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipesRoutingModule } from './user-recipes-routing.module';
import { UserRecipesComponent } from './user-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    UserRecipesComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UserRecipesRoutingModule,
    SharedModule
  ]
})
export class UserRecipesModule { }
