import { Component, Input } from '@angular/core';
import { LeaderboardEntry } from '../../../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.html',
  styleUrls: ['./leaderboard-table.scss'],
  imports: [CommonModule],
})
export class LeaderboardTableComponent {
  @Input() entries: LeaderboardEntry[] = [];
}
