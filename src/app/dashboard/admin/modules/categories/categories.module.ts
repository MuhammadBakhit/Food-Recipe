import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditAddComponanetComponent } from './components/edit-add-componanet/edit-add-componanet.component';


@NgModule({
  declarations: [
    ListCategoriesComponent,
    EditAddComponanetComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
