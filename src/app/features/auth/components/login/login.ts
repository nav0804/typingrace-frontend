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
import { SnackBarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackBarService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (!response.error) {
            this.successMessage = response.message ?? 'Logged In!!';
            this.snackBar.show(
              response.message ?? 'Authentication cleared. Welcome back!',
              'success'
            );
            this.loginForm.reset();

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          } else {
            this.snackBar.show(
              response.message ?? 'Authentication Failed',
              'error'
            );
            this.errorMessage =
              response.message ?? 'An error occured while logging in';
          }
        },
        error: (err) => {
          const fallbackMsg =
            err.error?.message || 'Invalid credentials or server unreachable.';
          this.snackBar.show(fallbackMsg, 'error');

          this.errorMessage = fallbackMsg;
        },
      });
    }
  }
}
