import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './components/create-room/create-room';
import { JoinRoomComponent } from './components/join-room/join-room';
import { LobbyPageComponent } from './lobby-page/lobby-page';

const routes: Routes = [{ path: '', component: LobbyPageComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LobbyPageComponent,
    CreateRoomComponent,
    JoinRoomComponent,
  ],
})
export class LobbyModule {}
