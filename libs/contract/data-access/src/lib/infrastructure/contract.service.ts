import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { filter, map, Observable, ReplaySubject, share } from 'rxjs';
import { Contract } from '../entities/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly http = inject(HttpClient);

  private cache$!: Observable<Contract[]>;

  constructor(@Inject('environment') private environment: any) {}

  getAll(): Observable<Contract[]> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<Contract[]>(`${this.environment.baseUrl}/documents`)
        .pipe(share({ connector: () => new ReplaySubject(1) }));
    }

    return this.cache$;
  }

  get(id: string): Observable<Contract> {
    return this.getAll().pipe(
      map((contracts) => contracts.find((c) => c.id === id)),
      filter((contract): contract is Contract => !!contract)
    );
  }

  upload(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest(
      'POST',
      `${this.environment.baseUrl}/documents/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }
}
