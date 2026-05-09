import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'lobby',
    loadChildren: () =>
      import('./features/lobby/lobby-module').then((m) => m.LobbyModule),
  },
  {
    path: 'race',
    loadChildren: () =>
      import('./features/race/race-module').then((m) => m.RaceModule),
  },
  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./features/leaderboard/leaderboard-module').then(
        (m) => m.LeaderboardModule
      ),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
