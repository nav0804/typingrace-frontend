import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for pipes/directives
import { LeaderboardEntry } from '../../../model';
import { MockDataService } from '../../../mock-data.services';
import { LeaderboardTableComponent } from '../components/leaderboard-table/leaderboard-table';

@Component({
  selector: 'app-leaderboard-page',
  standalone: true, // 1. Ensure this is marked standalone
  imports: [
    CommonModule,
    LeaderboardTableComponent,
  ],
  template: `
    <div class="page fade-in">
      <div class="lb-header">
        <h1 class="lb-title">leaderboard</h1>
        <p class="lb-sub">global rankings — updated after every race</p>
      </div>
      <div class="card">
        <!-- Now Angular knows what this is! -->
        <app-leaderboard-table [entries]="entries"></app-leaderboard-table>
      </div>
    </div>
  `,
  styles: [
    `
      .lb-header {
        margin-bottom: 28px;
      }
      .lb-title {
        font-family: var(--mono);
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .lb-sub {
        font-size: 13px;
        color: var(--text-2);
      }
    `,
  ],
})
export class LeaderboardPageComponent implements OnInit {
  entries: LeaderboardEntry[] = [];

  constructor(private mock: MockDataService) {}

  ngOnInit(): void {
    // Note: ensure this method exists in your mock service
    this.entries = this.mock.getLeaderboard_sync();
  }
}
