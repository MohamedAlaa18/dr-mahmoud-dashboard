import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/Services/course/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  file!: File;
  fileInvalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      price: [0, Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileInvalid = false;
    }
  }

  onSubmit() {
    if ((this.courseForm.valid && this.file) || this.data.action === 'update') {
      if (this.data.action == 'update') {
        this.updateCourse();
      } else {
        this.createCourse();
      }
    } else {
      this.courseForm.markAllAsTouched();
      if (!this.file && this.data.action !== 'update') {
        this.fileInvalid = true;
      }
    }
  }

  createCourse() {
    const formData = this.courseForm.value;
    if (this.file) {
      this.courseService.createCourse(formData, this.file).subscribe({
        next: (data) => {
          // Handle success
          console.log(data);
          this.openSnackBar('تم إنشاء الكورس بنجاح', 'حسناً');
        },
        error: (err) => {
          // Handle error
          console.error(err);
          this.openSnackBar('فشل في إنشاء الكورس', 'حسناً');
        }
      });
    }
  }

  updateCourse() {
    const formData: any = {};

    // Only add non-empty fields to formData
    for (const key in this.courseForm.controls) {
      const control = this.courseForm.controls[key];
      if (control.value) {
        formData[key] = control.value;
      }
    }

    if (this.data.action === 'update' && this.data.courseId) {
      formData.id = this.data.courseId;
    }

    this.courseService.updateCourse(formData, this.file).subscribe({
      next: (data) => {
        // Handle success
        console.log(data);
        this.openSnackBar('تم تحديث الكورس بنجاح', 'حسناً');
      },
      error: (err) => {
        // Handle error
        console.error(err);
        this.openSnackBar('فشل في تحديث الكورس', 'حسناً');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: message === 'تم إنشاء الكورس بنجاح' || message === 'تم تحديث الكورس بنجاح' ? 'snackbar-success' : ''
    });
  }
}
