import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false);
  _isLoading$ = this.isLoading$.asObservable();
  loadingexplainer$ = new BehaviorSubject<string>('');
  _loadingexplainer$ = this.loadingexplainer$.asObservable();

  setLoading(explainer: string) {
    this.isLoading$.next(true);
    this.loadingexplainer$.next(explainer);
  }

  cancelLoading() {
    this.isLoading$.next(false);
  }
}
