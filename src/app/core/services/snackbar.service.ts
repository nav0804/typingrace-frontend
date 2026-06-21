import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Snackbar {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private snackBarSubject = new Subject<Snackbar | null>();

  public snackBarState$ = this.snackBarSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'info',
    duration: number = 3000
  ) {
    console.log(
      `[Snackbar Event] Dispatching message: "${message}" of type: [${type}]`
    );
    this.snackBarSubject.next({ message, type, duration });

    setTimeout(() => {
      this.clear();
    }, duration);
  }
  clear() {
    this.snackBarSubject.next(null);
  }
}
