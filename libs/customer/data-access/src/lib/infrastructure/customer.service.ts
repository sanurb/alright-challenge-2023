import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, share } from 'rxjs';
import { Customer } from '../entities/customer.model';
import { environment } from '@nx-giant/shared/environments';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly http = inject(HttpClient);

  constructor(@Inject('environment') private environment: any) {}

  private cache$!: Observable<Customer[]>;

  getAll(): Observable<Customer[]> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<Customer[]>(`${this.environment.baseUrl}/users`)
        .pipe(share({ connector: () => new ReplaySubject(1) }));
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
