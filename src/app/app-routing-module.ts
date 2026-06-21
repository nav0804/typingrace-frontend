import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoloModeComponent } from './features/race/components/solo-mode/solo-mode';
import { LandingPageComponent } from './features/home/components/landing-page/landing-page';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    component: LandingPageComponent, // Make sure to import this at the top!
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
  {
    path: 'start-typing',
    component: SoloModeComponent,
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
