import { Injectable } from '@angular/core';
import { LocalStorageItem } from './local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get(item: LocalStorageItem) {
    const content = window.localStorage.getItem(item);

    if (!content) return;
    return JSON.parse(content);
  }

  set(item: LocalStorageItem, content: unknown) {
    if (!item || !content) return;
    window.localStorage.setItem(item, JSON.stringify(content));
  }

  clear(item: LocalStorageItem) {
    if (!item) return;
    window.localStorage.removeItem(item);
  }
}
