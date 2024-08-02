import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user/user.service'; // Ensure this path is correct

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  userTypes: { value: number, viewValue: string }[] = []; // Adjusted type for role IDs

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: [''],
      lastName: [''],
      birthDate: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsAppNo: [''],
      roles: [[], Validators.required]
    });

    // Fetch user types dynamically if needed
    this.loadUserTypes();
  }

  loadUserTypes() {
    // If fetching dynamically from a service
    // this.userService.getUserTypes().subscribe((types) => {
    //   this.userTypes = types;
    // });

    // Static data for example
    this.userTypes = [
      { value: 1, viewValue: 'Admin' },
      { value: 2, viewValue: 'Content Manager' },
      { value: 3, viewValue: 'Assistant' },
      { value: 4, viewValue: 'Student' }
    ];
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.userService.createUser(formData).subscribe({
        next: (data) => {
          // Handle success
          console.log(data);
          this.openSnackBar('تم إنشاء المستخدم بنجاح', 'حسناً');
          this.userForm.reset();
        },
        error: (err) => {
          // Handle error
          console.error(err);
          this.openSnackBar('فشل في إنشاء المستخدم', 'حسناً');
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: message === 'User created successfully' ? 'snackbar-success' : ''
    });
  }
}
