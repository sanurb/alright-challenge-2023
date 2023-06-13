import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key) ?? '';
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    const strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  isInStorage(key: string): boolean {
    return key in localStorage;
  }
}
