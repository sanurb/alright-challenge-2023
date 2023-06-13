import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { filter, map, Observable, of, ReplaySubject, share, tap } from 'rxjs';
import { Customer } from '../entities/customer.model';
import { StorageService } from '@nx-giant/shared/util';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  private cache$!: Observable<Customer[]>;

  constructor(@Inject('environment') private environment: any) {}

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${this.environment.baseUrl}/auth/register`,
      customer
    );
  }

  getAll(): Observable<Customer[]> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<Customer[]>(`${this.environment.baseUrl}/users`)
        .pipe(
          tap((data) => console.log(data)), // agregar esto
          share({ connector: () => new ReplaySubject(1) })
        );
    }

    return this.cache$;
  }

  get(id: string): Observable<Customer> {
    return this.getAll().pipe(
      map((customers) => customers.find((c) => c.id === id)),
      filter((customer): customer is Customer => !!customer)
    );
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string; user: any }> {
    return this.http
      .post<{ token: string; user: any }>(
        `${this.environment.baseUrl}/auth/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.storageService.set('jwt', response.token);
          this.storageService.set('user', response.user);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return of(!!this.storageService.get<string>('jwt'));
  }

  logout(): void {
    this.storageService.remove('jwt');
    this.storageService.remove('user');
  }

  getUser(): any {
    return this.storageService.get<any>('user');
  }
}
