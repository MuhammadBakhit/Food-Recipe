import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);

  if (localStorage.getItem('userToken') !== null) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false; 
  }
};
