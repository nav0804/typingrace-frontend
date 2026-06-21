import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  // 1. Inject AuthService into the constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';

      // 2. Call your backend service instead of just console logging
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (!response.error) {
            // If response.message is undefined, it falls back to the default text string
            this.successMessage =
              response.message ?? 'Registration successful!';
            this.registerForm.reset();

            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            this.errorMessage =
              response.message ?? 'An error occurred during registration.';
          }
        },
        error: (err) => {
          this.errorMessage =
            err.error?.message || 'Something went wrong during registration.';
        },
      });
    }
  }
}
