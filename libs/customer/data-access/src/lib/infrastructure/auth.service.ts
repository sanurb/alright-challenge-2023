import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StorageService } from '@nx-giant/shared/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  constructor(@Inject('environment') private environment: any) {}

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

  isLoggedIn(): boolean {
    return !!this.storageService.get<string>('jwt');
  }

  logout(): void {
    this.storageService.remove('jwt');
    this.storageService.remove('user');
  }

  getUser(): any {
    return this.storageService.get<any>('user');
  }
}
