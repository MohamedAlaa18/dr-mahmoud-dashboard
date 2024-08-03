import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/Services/course/course.service';
import { Router } from '@angular/router';

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
    public dialogRef: MatDialogRef<CreateCourseComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      price: [0, Validators.required],
    });

    if (this.data.action === 'update' && this.data.courseId) {
      this.getCourse(this.data.courseId);
    }
  }

  getCourse(courseId: number) {
    this.courseService.getCourse(courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.content.title,
          description: course.content.description,
          code: course.content.code,
          price: course.content.price
        });
        console.log(course);
      },
      error: (err) => {
        console.error(err);
        this.openSnackBar('فشل في جلب بيانات الكورس', 'حسناً');
      }
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
    if (this.courseForm.valid && (this.file || this.data.action === 'update')) {
      if (this.data.action === 'update') {
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

    this.courseService.createCourse(formData, this.file).subscribe({
      next: (data) => {
        console.log(data);
        this.openSnackBar('تم إنشاء الكورس بنجاح', 'حسناً');
        this.reloadCurrentRoute();
        this.dialogRef.close(false);
      },
      error: (err) => {
        console.error(err);
        this.openSnackBar('فشل في إنشاء الكورس', 'حسناً');
      }
    });
  }

  updateCourse() {
    const formData: any = {};

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
        console.log(data);
        this.openSnackBar('تم تحديث الكورس بنجاح', 'حسناً');
        this.reloadCurrentRoute();
        this.dialogRef.close(false);
      },
      error: (err) => {
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

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
