import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService } from 'src/app/Services/teacher/teacher.service';

@Component({
  selector: 'app-send-info',
  templateUrl: './send-info.component.html',
  styleUrls: ['./send-info.component.css']
})
export class SendInfoComponent {
  sendInfoForm!: FormGroup;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<SendInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private teacherService: TeacherService,
    private fb: FormBuilder
  ) {
    this.id = this.data.id;
    this.createForm();
  }

  createForm() {
    this.sendInfoForm = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]] // Define form controls with validators
    });
  }

  onYesClick() {
    this.sendInfo(this.id, this.sendInfoForm.value.mail);
    this.dialogRef.close(true);

  }

  onNoClick() {
    this.dialogRef.close(false);
  }


  sendInfo(id: string, info: string): void {
    if (!info.trim()) {
      return;
    } else {
      const aboutTeacher = {
        accountNote: info.toString()
      };
      this.teacherService.saveTeacherAccountNote(id, aboutTeacher).subscribe(
        (response) => {
          console.log('Update successful:', response);
          this.openSnackBar('تم إرسال الرسالة', 'حسناَ');
        },
        (error) => {
          if (error.status == 200) {
            this.openSnackBar('تم إرسال الرسالة', 'حسناَ');
          }
          console.log(error);
         }
      );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });
  }
}
