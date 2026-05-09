import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RacePageComponent } from './race-page/race-page';
import { TypingAreaComponent } from './components/typing-area/typing-area';
import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { CountdownComponent } from './components/countdown/countdown';
import { ResultsComponent } from './components/results/results';

const routes: Routes = [
  { path: ':id', component: RacePageComponent }, // The ID is now part of the URL
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    RacePageComponent,
    TypingAreaComponent,
    ProgressBarComponent,
    CountdownComponent,
    ResultsComponent,
  ],
})
export class RaceModule {}
