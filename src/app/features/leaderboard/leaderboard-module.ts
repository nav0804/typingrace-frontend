import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page';
import { LeaderboardTableComponent } from './components/leaderboard-table/leaderboard-table';

const routes: Routes = [{ path: '', component: LeaderboardPageComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LeaderboardTableComponent,
    LeaderboardPageComponent,
  ],
})
export class LeaderboardModule {}
