import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { CustomerService } from '../infrastructure/customer.service';

export const authGuard = () => {
  const service = inject(CustomerService);
  const router = inject(Router);

  return service.isLoggedIn().pipe(
    take(1),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
      return isLoggedIn;
    })
  );
};
