import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typing-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typing-area.html',
  styleUrls: ['./typing-area.scss'], // Make sure your CSS is in here!
})
export class TypingAreaComponent implements AfterViewInit {
  @Input() text: string = '';
  @Output() progress = new EventEmitter<{
    wordsTyped: number;
    accuracy: number;
    errorCount: number;
  }>();

  // Grabs the hidden input from the HTML
  @ViewChild('hiddenInputRef') hiddenInput!: ElementRef<HTMLInputElement>;

  userInput: string = '';
  errorCount: number = 0;

  ngAfterViewInit() {
    // Automatically focus the input as soon as the Solo Mode page loads
    setTimeout(() => this.focusInput(), 0);
  }

  // Forces the browser's cursor into our invisible input
  focusInput() {
    this.hiddenInput.nativeElement.focus();
  }

  // Handles standard typing, backspaces, and mobile keyboards seamlessly
  onInputChange(event: any) {
    const newVal = event.target.value;

    // Prevent typing beyond the maximum text length
    if (newVal.length > this.text.length) {
      event.target.value = this.userInput; // Revert
      return;
    }

    // Check if the newly added letter was a mistake
    if (newVal.length > this.userInput.length) {
      const lastCharIdx = newVal.length - 1;
      if (newVal[lastCharIdx] !== this.text[lastCharIdx]) {
        this.errorCount++;
      }
    }

    this.userInput = newVal;
    this.emitProgress();
  }

  // Maps the current index to your specific CSS classes
  getClass(index: number): string {
    // 1. The letter they are currently supposed to type (Blinking Caret)
    if (index === this.userInput.length) {
      return 'current';
    }

    // 2. Letters they haven't reached yet
    if (index > this.userInput.length) {
      return 'pending';
    }

    // 3. Letters they typed correctly
    if (this.userInput[index] === this.text[index]) {
      return 'correct';
    }

    // 4. Letters they messed up
    return 'wrong';
  }

  private emitProgress() {
    const wordsTyped = this.userInput.split(' ').length;
    const accuracy =
      this.userInput.length > 0
        ? Math.max(
            0,
            Math.round(
              ((this.userInput.length - this.errorCount) /
                this.userInput.length) *
                100
            )
          )
        : 100;

    this.progress.emit({ wordsTyped, accuracy, errorCount: this.errorCount });
  }
}
