import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  {path: '', component: ListRecipesComponent},
  {path:'addRecipe', component: AddEditComponent},
  {path:'editRecipe/:id', component: AddEditComponent},
  {path:'viewRecipe/:id/:formDisabled', component: AddEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
