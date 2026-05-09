import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay -->
    <div
      class="fixed inset-0 z-[200] flex items-center justify-center bg-race-bg/85 backdrop-blur-sm transition-opacity"
    >
      <!-- Card -->
      <div class="text-center animate-pulse">
        <div class="text-[13px] text-slate-400 uppercase tracking-[0.1em] mb-3">
          race starts in
        </div>

        <!-- Number / Go state -->
        <div
          class="font-mono text-9xl font-semibold leading-none mb-3 transition-colors"
          [ngClass]="count === 0 ? 'text-race-primary' : 'text-race-caret'"
        >
          {{ count === 0 ? 'go!' : count }}
        </div>

        <div class="text-[13px] text-slate-500 font-mono">
          get ready to type
        </div>
      </div>
    </div>
  `,
})
export class CountdownComponent {
  @Input() count = 3;
}
