import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, Observable, of, pipe, tap } from 'rxjs';
import { Customer } from '../entities/customer.model';
import { CustomerService } from '../infrastructure/customer.service';

interface State {
  createdCustomers: Customer[];
  customers: Customer[];
  jwtToken: string | null;
  user: Customer | null;
}
@Injectable({
  providedIn: 'root',
})
export class CustomerFacadeService extends ComponentStore<State> {
  private customerService = inject(CustomerService);

  readonly customers$ = this.select(({ customers, createdCustomers }) => [
    ...createdCustomers,
    ...customers,
  ]);

  readonly loadAllCustomers = this.effect<void>(($notifier) =>
    $notifier.pipe(
      exhaustMap(() => this.customerService.getAll()),
      tapResponse((customers) => this.patchState({ customers }), console.error)
    )
  );

  readonly addCustomer = this.effect<Customer>((customer$) =>
    customer$.pipe(
      exhaustMap((customer) =>
        this.customerService.create(customer).pipe(
          tapResponse((createdCustomer) => {
            this.patchState((state) => ({
              ...state,
              createdCustomers: [createdCustomer, ...state.createdCustomers],
            }));
          }, console.error)
        )
      )
    )
  );

  readonly userLogin = this.effect<{ email: string; password: string }>(
    (credentials$) =>
      credentials$.pipe(
        exhaustMap((credentials) =>
          this.customerService.login(credentials).pipe(
            tapResponse((response) => {
              this.patchState({
                jwtToken: response.token,
                user: response.user,
              });
            }, console.error)
          )
        )
      )
  );

  readonly userLogout = this.effect<void>(($notifier) =>
    $notifier.pipe(
      tap(() => {
        this.customerService.logout();
        this.patchState({ jwtToken: null, user: null });
      })
    )
  );

  readonly isLoggedIn$ = this.select((state) => !!state.jwtToken);

  readonly user$ = this.select((state) => state.user);

  constructor() {
    super({
      createdCustomers: [],
      customers: [],
      jwtToken: null,
      user: null,
    });
  }

  getCustomer(id: string): Observable<Customer> {
    return this.select(({ customers, createdCustomers }) =>
      [...createdCustomers, ...customers].find((c) => c.id === id)
    ).pipe(
      exhaustMap((customer) =>
        customer ? of(customer) : this.customerService.get(id)
      )
    );
  }
}
