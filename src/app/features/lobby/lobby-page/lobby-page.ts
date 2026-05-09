import { CommonModule } from '@angular/common';
import { CreateRoomComponent } from '../components/create-room/create-room';
import { JoinRoomComponent } from '../components/join-room/join-room';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lobby-page',
  standalone: true,
  imports: [CommonModule, CreateRoomComponent, JoinRoomComponent],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-12 fade-in">
      <div class="text-center mb-12">
        <h1
          class="text-4xl font-mono font-bold text-white mb-2 tracking-tighter"
        >
          multiplayer_typing_race
        </h1>
        <p class="text-slate-500 font-mono">
          choose a mode to begin the competition
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left: Create Room Section -->
        <app-create-room></app-create-room>

        <!-- Right: Join Room Section -->
        <app-join-room></app-join-room>
      </div>
    </div>
  `,
})
export class LobbyPageComponent {}
