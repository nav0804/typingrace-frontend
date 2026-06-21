import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypingAreaComponent } from '../typing-area/typing-area';
import { MockDataService } from '../../../../mock-data.services';

@Component({
  selector: 'app-solo-mode',
  standalone: true,
  imports: [CommonModule, TypingAreaComponent],
  templateUrl: './solo-mode.html',
  styleUrls: ['./solo-mode.scss'],
})
export class SoloModeComponent implements OnInit, OnDestroy {
  status: 'IN_PROGRESS' | 'FINISHED' = 'IN_PROGRESS';
  textToType = '';
  wordsArray: string[] = [];

  // Stats
  currentWpm = 0;
  currentAccuracy = 100;
  errorCount = 0;

  // Timer State
  timeLeft = 30; // 30 seconds
  private timerInterval: any;
  private startTime = 0;
  private hasStarted = false;

  constructor(private mock: MockDataService, public router: Router) {}

  ngOnInit() {
    // Get text and duplicate it to ensure it's long enough for 30 seconds of typing
    const baseText = this.mock.getText_sync();
    this.textToType = `${baseText}`;
    this.wordsArray = this.textToType.split(' ');
  }

  handleProgress(event: {
    wordsTyped: number;
    accuracy: number;
    errorCount: number;
  }) {
    // Start the 30s countdown on the VERY FIRST keystroke
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.startTime = Date.now();
      this.startTimer();
    }

    this.currentAccuracy = event.accuracy;
    this.errorCount = event.errorCount;

    // Live WPM Calculation
    const timeElapsedMinutes = (Date.now() - this.startTime) / 60000;
    if (timeElapsedMinutes > 0) {
      this.currentWpm = Math.round(event.wordsTyped / timeElapsedMinutes);
    }

    // Fallback: If they somehow type all the text before 30s
    if (event.wordsTyped >= this.wordsArray.length) {
      this.endSession();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      // Stop exactly at 0
      if (this.timeLeft <= 0) {
        this.endSession();
      }
    }, 1000);
  }

  endSession() {
    this.status = 'FINISHED';
    clearInterval(this.timerInterval);

    // Optional: Save final stats to your RaceStateService or Auth Profile here
  }

  resetSession() {
    // Reset all states
    this.status = 'IN_PROGRESS';
    this.timeLeft = 30;
    this.currentWpm = 0;
    this.currentAccuracy = 100;
    this.errorCount = 0;
    this.hasStarted = false;
    this.startTime = 0;

    // Clear any lingering intervals
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Fetch a fresh batch of text
    const baseText = this.mock.getText_sync();
    this.textToType = `${baseText} ${baseText} ${baseText}`;
    this.wordsArray = this.textToType.split(' ');
  }

  ngOnDestroy() {
    // Prevent memory leaks if the user clicks away before the timer ends
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
