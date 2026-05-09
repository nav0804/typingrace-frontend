import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

// Update this in your .ts file
export type CharState = 'correct' | 'wrong' | 'current' | 'pending';

export interface CharModel {
  char: string;
  state: CharState;
}

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.html',
  styleUrls: ['./typing-area.scss'],
})
export class TypingAreaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() text = '';
  @Output() progress = new EventEmitter<{
    wordsTyped: number;
    accuracy: number;
    errorCount: number;
  }>();

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  chars: CharModel[] = [];
  currentInput = '';
  currentWordIdx = 0;
  errorCount = 0;
  totalTyped = 0;

  private words: string[] = [];

  ngOnInit(): void {
    this.buildChars();
  }
  ngOnChanges(): void {
    this.buildChars();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.inputRef?.nativeElement.focus(), 50);
  }

  private buildChars(): void {
    this.chars = [];
    this.words = this.text.split(' ');

    this.words.forEach((word, wi) => {
      [...word].forEach((ch, ci) => {
        this.chars.push({
          char: ch,
          state: wi === 0 && ci === 0 ? 'current' : 'pending',
        });
      });
      if (wi < this.words.length - 1) {
        this.chars.push({ char: ' ', state: wi === 0 ? 'current' : 'pending' });
      }
    });
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const lastChar = input[input.length - 1];

    if (!lastChar) return;
    (event.target as HTMLInputElement).value = '';

    // Find the current position (first 'current' or first 'pending')
    const curIdx = this.chars.findIndex((c) => c.state === 'current');
    if (curIdx === -1) return;

    const expected = this.chars[curIdx].char;
    this.totalTyped++;

    if (lastChar === expected) {
      this.chars[curIdx].state = 'correct';
    } else {
      this.chars[curIdx].state = 'wrong';
      this.errorCount++;
    }

    // Advance cursor
    if (curIdx + 1 < this.chars.length) {
      this.chars[curIdx + 1].state = 'current';
    }

    // Count completed words (after a space or last word)
    const completedChars = this.chars.filter(
      (c) => c.state === 'correct' || c.state === 'wrong'
    ).length;
    let wordsTyped = 0;
    let idx = 0;
    for (const word of this.words) {
      const wordLen = word.length;
      const wordChars = this.chars.slice(idx, idx + wordLen);
      const done = wordChars.every(
        (c) => c.state === 'correct' || c.state === 'wrong'
      );
      if (done) wordsTyped++;
      idx += wordLen + 1; // +1 for space
    }

    const accuracy =
      this.totalTyped > 0
        ? Math.round(
            ((this.totalTyped - this.errorCount) / this.totalTyped) * 100
          )
        : 100;

    this.progress.emit({ wordsTyped, accuracy, errorCount: this.errorCount });
  }

  trackByIdx(i: number): number {
    return i;
  }
}
