import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router'; // Required for navigation
import { RaceStateService } from '../../../../core/services/race-state.service'; // Adjust path if needed

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-room.html',
  styleUrls: ['./create-room.scss'],
})
export class CreateRoomComponent {
  @Input() loading = false;
  @Output() create = new EventEmitter<any>();

  form: FormGroup;

  wordPacks = [
    { id: 1, label: 'Common English (50 words)' },
    { id: 2, label: 'Programming terms' },
    { id: 3, label: 'Hard mode (100 words)' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router, // Inject the Router
    private raceState: RaceStateService // Inject your State Service
  ) {
    this.form = this.fb.group({
      wordPackId: [1, Validators.required],
      wordCount: [50, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const { wordPackId, wordCount } = this.form.value;

      // 1. Generate a random 8-character ID
      const roomId = Math.random().toString(36).substring(2, 10).toUpperCase();

      // 2. Save settings to your RaceStateService
      this.raceState.patch({
        wordCount,
        roomCode: roomId,
      });

      // 3. Navigate to the race page with the dynamic ID
      this.router.navigate(['/race', roomId]);
    }
  }
}
