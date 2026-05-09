import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Player, RoomStatus } from '../../../model';
import { MockDataService } from '../../../mock-data.services';
import { RaceStateService } from '../../../core/services/race-state.service';
import { CountdownComponent } from '../components/countdown/countdown';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { TypingAreaComponent } from '../components/typing-area/typing-area';
import { ResultsComponent } from '../components/results/results';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-race-page',
  templateUrl: './race-page.html',
  styleUrls: ['./race-page.scss'],
  imports: [
    CountdownComponent,
    CommonModule,
    ProgressBarComponent,
    TypingAreaComponent,
    ResultsComponent,
  ],
})
export class RacePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  players: Player[] = [];
  textSnapshot = '';
  roomCode = '';
  status: RoomStatus = 'COUNTDOWN';
  countdown = 3;
  elapsedMs = 0;
  currentWpm = 0;
  currentAccuracy = 100;
  errorCount = 0;
  wordsTyped = 0;

  finishedPlayers: Player[] = [];

  private countdownSub?: Subscription;

  constructor(
    private mock: MockDataService,
    private raceState: RaceStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.players = this.mock.getPlayers_sync();
    this.textSnapshot = this.mock.getText_sync();
    this.roomCode = this.raceState.snapshot.roomCode || 'XK92PL4A';

    this.raceState.state$.pipe(takeUntil(this.destroy$)).subscribe((s) => {
      this.elapsedMs = s.elapsedMs;
      this.currentWpm = s.currentWpm;
      this.currentAccuracy = s.currentAccuracy;
      this.errorCount = s.errorCount;
      this.wordsTyped = s.wordsTyped;
    });

    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.countdownSub?.unsubscribe();
    this.raceState.stopTimer();
  }

  private startCountdown(): void {
    this.status = 'COUNTDOWN';
    this.countdown = 3;

    this.countdownSub = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.countdownSub?.unsubscribe();
        this.status = 'IN_PROGRESS';
        this.raceState.startTimer();
      }
    });
  }

  onProgress(event: {
    wordsTyped: number;
    accuracy: number;
    errorCount: number;
  }): void {
    const { wordsTyped, accuracy, errorCount } = event;
    const wpm = this.raceState.calcWpm(wordsTyped, this.elapsedMs);

    this.raceState.patch({
      wordsTyped,
      currentWpm: wpm,
      currentAccuracy: accuracy,
      errorCount,
    });

    const me = this.players.find((p) => p.isYou);
    if (me) {
      me.progress = Math.round((wordsTyped / this.textWords.length) * 100);
      me.wpm = wpm;
      me.accuracy = accuracy;
    }

    this.simulateOpponentTick();

    if (wordsTyped >= this.textWords.length) {
      this.onRaceFinished();
    }
  }

  private simulateOpponentTick(): void {
    const opp = this.players.find((p) => !p.isYou);
    if (opp && opp.progress < 100) {
      opp.progress = Math.min(
        100,
        opp.progress + Math.floor(Math.random() * 3)
      );
      opp.wpm = Math.floor(65 + Math.random() * 10);
    }
  }

  private onRaceFinished(): void {
    this.raceState.stopTimer();
    this.status = 'FINISHED';
    this.finishedPlayers = this.mock.getFinished_sync();
  }

  onPlayAgain(): void {
    this.router.navigate(['/lobby']);
  }

  get textWords(): string[] {
    return this.textSnapshot.split(' ');
  }

  get elapsedFormatted(): string {
    const s = Math.floor(this.elapsedMs / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }
}
