import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { CouponsComponent } from './Components/coupons/coupons.component';
import { UsersComponent } from './Components/users/users.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent, data: { title: 'Students' } },
  { path: "", redirectTo: "students", pathMatch: "full", data: { title: 'Students' } },
  { path: 'users', component: UsersComponent, data: { title: 'Teachers' } },
  { path: 'coupons', component: CouponsComponent, data: { title: 'Coupons' } },
  { path: 'courses', component: CoursesComponent, data: { title: 'Course' } },
  { path: 'login', component: LoginComponent, data: { title: 'login' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
