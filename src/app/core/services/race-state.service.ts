import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Player, RoomStatus } from '../../model';

export interface RaceState {
  status: RoomStatus;
  roomCode: string;
  wordCount: number; // <--- Add this line
  textSnapshot: string;
  players: Player[];
  countdown: number;
  elapsedMs: number;
  wordsTyped: number;
  currentWpm: number;
  currentAccuracy: number;
  errorCount: number;
}

const INITIAL: RaceState = {
  status: 'WAITING',
  roomCode: '',
  wordCount: 50, // <--- Add this line
  textSnapshot: '',
  players: [],
  countdown: 3,
  elapsedMs: 0,
  wordsTyped: 0,
  currentWpm: 0,
  currentAccuracy: 100,
  errorCount: 0,
};

@Injectable({ providedIn: 'root' })
export class RaceStateService {
  private _state = new BehaviorSubject<RaceState>({ ...INITIAL });
  state$ = this._state.asObservable();

  private timerSub?: Subscription;

  get snapshot(): RaceState {
    return this._state.getValue();
  }

  patch(partial: Partial<RaceState>): void {
    this._state.next({ ...this.snapshot, ...partial });
  }

  startTimer(): void {
    this.stopTimer();
    const start = Date.now();
    this.timerSub = interval(200).subscribe(() => {
      this.patch({ elapsedMs: Date.now() - start });
    });
  }

  stopTimer(): void {
    this.timerSub?.unsubscribe();
    this.timerSub = undefined;
  }

  reset(): void {
    this.stopTimer();
    this._state.next({ ...INITIAL });
  }

  /** Calculate WPM from elapsed time and words typed */
  calcWpm(wordsTyped: number, elapsedMs: number): number {
    if (elapsedMs < 1000) return 0;
    return Math.round(wordsTyped / (elapsedMs / 60000));
  }
}
