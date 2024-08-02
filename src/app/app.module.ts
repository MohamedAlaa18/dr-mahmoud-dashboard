import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { SideBarComponent } from './Components/Layout/side-bar/side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './Components/students/students.component';
import { CustomButtonRendererComponent } from './Components/custom-button-renderer/custom-button-renderer.component';
import { SendInfoComponent } from './Components/Dialog/send-info/send-info.component';
import { SignOutComponent } from './Components/Dialog/sign-out/sign-out.component';
import { DeleteComponent } from './Components/Dialog/delete/delete.component';
import { GenerateCouponComponent } from './Components/Dialog/generate-coupon/generate-coupon.component';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './Components/users/users.component';
import { LogoComponent } from 'src/assets/svgs/logo/logo.component';
import { CouponsComponent } from './Components/coupons/coupons.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreateUserComponent } from './Components/Dialog/create-user/create-user.component';
import { StudentInfoComponent } from './Components/Dialog/student-info/student-info.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { CreateCourseComponent } from './Components/Dialog/create-course/create-course.component';
import { LoginComponent } from './Components/login/login.component';
import { DepositComponent } from './Components/Dialog/deposit/deposit.component';
import { CustomImageRendererComponent } from './Components/custom-image-renderer/custom-image-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SideBarComponent,
    StudentsComponent,
    CustomButtonRendererComponent,
    SendInfoComponent,
    LoginComponent,
    SignOutComponent,
    CouponsComponent,
    DeleteComponent,
    GenerateCouponComponent,
    UsersComponent,
    LogoComponent,
    CreateUserComponent,
    StudentInfoComponent,
    CoursesComponent,
    CreateCourseComponent,
    DepositComponent,
    CustomImageRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    AgGridAngular,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
