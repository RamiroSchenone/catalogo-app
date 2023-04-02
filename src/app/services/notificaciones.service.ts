import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  actionLabel: string = 'CERRAR';

  constructor(private snackBar: MatSnackBar) {}
  showSuccessMessage(message: string) {
    this.snackBar.open(message, this.actionLabel, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'success-message',
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, this.actionLabel, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'error-message',
    });
  }
}
