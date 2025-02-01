import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { IcoursesComponent } from './icourses/icourses.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CourseAdminComponent } from './course-admin/course-admin.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AdminassigncoursesComponent } from './adminassigncourses/adminassigncourses.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ShowProgressComponent } from './show-progress/show-progress.component';
import { ShowProgressSpecificCourseComponent } from './show-progress-specific-course/show-progress-specific-course.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'adminuser', component: AdminUsersComponent},
  { path: 'homestudent/:user_id', component: HomeStudentComponent},
  // { path: 'courses', component: CourseDetailsComponent },
  { path: 'courses/:id_course/:user_id', component: CourseDetailsComponent },
  // { path: 'admincourse', component: CourseAdminComponent},
  { path: 'icourses', component: IcoursesComponent },
  { path: 'add-assignment', component: AddAssignmentComponent }, 
  { path: 'assign-courses', component: AdminassigncoursesComponent }, 
  { path: 'add-material', component: AddMaterialComponent },
  { path: 'show-progress', component: ShowProgressComponent },
  { path: 'show-specific-progress/:id', component: ShowProgressSpecificCourseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
