import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
// import { AuthService } from 'src/app/Services/auth/auth.service';
// import { TeacherService } from 'src/app/Services/teacher/teacher.service';
import { SignOutComponent } from '../../Dialog/sign-out/sign-out.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') className = '';
  @Input() inputSideBar!: MatSidenav;
  theme = new FormControl(false);
  role!: string;
  userData: any = "";

  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  constructor(
    // private authService: AuthService,
    // private techServices: TeacherService,
    private dialog: MatDialog,
  ) {
    // this.role = this.authService.getUserRole();
    // console.log(this.role)
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('dashThemePreference');

    const currentTheme = savedTheme === 'dark';

    this.theme.setValue(currentTheme);

    this.applyTheme(currentTheme);

    this.theme.valueChanges.subscribe((currentTheme) => {
      this.applyTheme(currentTheme);
    });

    // this.getTeacherById();
  }

  // getTeacherById() {
  //   this.techServices.getTeacherById(this.authService.getUserId()).subscribe({
  //     next: (data => {
  //       this.userData = data;
  //       // console.log(data)
  //     })
  //   })
  // }

  private applyTheme(currentTheme: boolean | null): void {
    if (currentTheme === null) {
      currentTheme = false;
    }

    localStorage.setItem('dashThemePreference', currentTheme ? 'dark' : 'light');

    this.className = currentTheme ? this.darkClass : this.lightClass;
    const bodyElement = document.getElementsByTagName('body')[0];

    if (currentTheme) {
      bodyElement.classList.add(this.darkClass);
      bodyElement.classList.remove(this.lightClass);
    } else {
      bodyElement.classList.add(this.lightClass);
      bodyElement.classList.remove(this.darkClass);
    }
  }

  public openSignOutDialog(): void {
    const dialogRef = this.dialog.open(SignOutComponent, {
      data: {
        message: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
        confirmButtonText: 'تسجيل الخروج'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userData = null;
      }
    });
  }

  isDark() {
    return localStorage.getItem('dashThemePreference') == 'dark';
  }

  userExist() {
    return localStorage.getItem('adminId');
  }
}
