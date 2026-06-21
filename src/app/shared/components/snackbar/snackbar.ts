import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  Snackbar,
  SnackBarService,
} from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.scss'],
})
export class SnackbarShared implements OnInit, OnDestroy {
  public data: Snackbar | null = null;
  private sub!: Subscription;

  constructor(
    private snackbarService: SnackBarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.snackbarService.snackBarState$.subscribe((state) => {
      this.data = state;

      this.cdr.detectChanges();
    });
  }

  close() {
    this.snackbarService.clear();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
