import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule here
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,  
    HomeComponent,
    IcoursesComponent,
    AddAssignmentComponent,
    AdminComponent,
    AdminUsersComponent,
    CourseAdminComponent,
    HomeStudentComponent,
    CourseDetailsComponent,
    AdminassigncoursesComponent,
    AddMaterialComponent,
    ShowProgressComponent,
    ShowProgressSpecificCourseComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule ,
    AppRoutingModule ,
    ToastModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
