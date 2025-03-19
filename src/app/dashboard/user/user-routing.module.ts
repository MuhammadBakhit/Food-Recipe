import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent }, 
  { path: 'fav', loadChildren: () => import('./fav/fav.module').then(m => m.FavModule) },
  { path: 'user-recipes', loadChildren: () => import('./user-recipes/user-recipes.module').then(m => m.UserRecipesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
