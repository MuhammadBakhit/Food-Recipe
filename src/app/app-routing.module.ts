import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ViewProfileComponent } from './shared/components/view-profile/view-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'profile', component: ViewProfileComponent },
  { 
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => 
      import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
