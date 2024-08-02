import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
    });
    console.log(this.data.stdId)
  }

  onSubmit() {
    if (this.depositForm.valid) {
      const amount = this.depositForm.get('amount')?.value;
      const userId = this.data.stdId;

      this.userService.deposit(userId, amount).subscribe({
        next: (response) => {
          console.log('Deposit successful', response);
          this.openSnackBar('تم الإيداع بنجاح', 'حسناً');
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
}
