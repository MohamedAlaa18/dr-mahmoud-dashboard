import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletsService } from 'src/app/Services/Wallets/wallets.service';

@Component({
  selector: 'app-generate-coupon',
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.css']
})
export class GenerateCouponComponent {
  isInputFocused: boolean = false;
  couponForm!: FormGroup;
  role!: string;
  generatedCoupon: any;

  constructor(
    private fb: FormBuilder,
    private walletService: WalletsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.couponForm = this.fb.group({
      value: ['', Validators.required],
      numberOfUses: ['', Validators.required],
      dayValid: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.couponForm.valid) {
      const formData = {
        value: this.couponForm.value.value,
        numberOfUses: this.couponForm.value.numberOfUses,
        dayValid: this.couponForm.value.dayValid,
      };

      this.walletService.generateCoupon(formData).subscribe({
        next: (data) => {
          // Handle success
          console.log(data);
          this.generatedCoupon = data;
          this.openSnackBar('تم إنشاء الكوبون بنجاح', 'حسناً');
        },
        error: (err) => {
          // Handle error
          console.error(err);
          this.openSnackBar('فشل في إنشاء الكوبون', 'حسناً');
        },
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: message === 'تم إنشاء الكوبون بنجاح' ? 'snackbar-success' : ''
    });
  }
}
