import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, share, tap } from 'rxjs';
import { Customer } from '../entities/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);

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
}
