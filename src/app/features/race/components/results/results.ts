import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrls: ['./results.scss'],
})
export class ResultsComponent {
  @Input() players: Player[] = [];
  @Output() playAgain = new EventEmitter<void>();
}
