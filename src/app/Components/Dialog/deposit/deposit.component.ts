import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DepositComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
    });
    console.log(this.data.stdId);
  }

  onSubmit() {
    if (this.depositForm.valid) {
      const amount = this.depositForm.get('amount')?.value;
      const userId = this.data.stdId;

      this.userService.deposit(userId, amount).subscribe({
        next: (response) => {
          console.log('Deposit successful', response);
          this.openSnackBar('تم الإيداع بنجاح', 'حسناً');
          this.reloadCurrentRoute();
          this.dialogRef.close(false);
        },
        error: (err) => {
          console.error('Deposit failed', err);
          this.openSnackBar('فشل في الإيداع', 'حسناً');
        }
      });
    } else {
      this.depositForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: message === 'تم الإيداع بنجاح' ? 'snackbar-success' : ''
    });
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
