import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-join-room',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="card panel">
      <h2 class="panel-title">join room</h2>
      <p class="panel-sub">enter the 8-character code from your opponent</p>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="field">
          <label class="label">room code</label>
          <input
            class="input-field code-input"
            formControlName="code"
            type="text"
            maxlength="8"
            placeholder="XK92PL4A"
            (input)="toUpper()"
            autocomplete="off"
            spellcheck="false"
          />
          <span class="hint" *ngIf="form.get('code')?.errors?.['minlength']">
            code must be 8 characters
          </span>
        </div>

        <button
          class="btn-primary full-w"
          type="submit"
          [disabled]="form.invalid"
        >
          join →
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .panel {
        height: 100%;
      }
      .panel-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .panel-sub {
        font-size: 13px;
        color: var(--text-2);
        margin-bottom: 24px;
      }
      .field {
        margin-bottom: 20px;
      }
      .full-w {
        width: 100%;
      }
      .code-input {
        text-transform: uppercase;
        letter-spacing: 6px;
        font-size: 18px;
        text-align: center;
      }
      .hint {
        font-size: 12px;
        color: var(--red);
        margin-top: 6px;
        display: block;
      }
    `,
  ],
})
export class JoinRoomComponent {
  @Output() join = new EventEmitter<string>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
    });
  }

  toUpper(): void {
    const ctrl = this.form.get('code')!;
    ctrl.setValue(ctrl.value.toUpperCase(), { emitEvent: false });
  }

  submit(): void {
    if (this.form.valid) {
      this.join.emit(this.form.value.code);
    }
  }
}
