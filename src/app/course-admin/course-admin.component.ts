import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.css']
})

export class CourseAdminComponent implements OnInit{
  newCourseName: string = '';
  message: string = '';
  Courses: any[] = [];

  constructor( private adminService:AdminService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }
  fetchCourses(): void {
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.Courses = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteCourse(course_id: number): void {
    this.adminService.deleteCourse(course_id).subscribe(() => {
      this.Courses = this.Courses.filter(course => course.id !== course_id);
    });
  }

  archieveCourse(course_id: number): void {
    const course = this.Courses.find(course => course.id === course_id);
    if (course) {
      course.archieve = 1;
      this.adminService.archieveAndUnarchieveCourse(course_id , course).subscribe();
    }
  }

  unarchieveCourse(course_id: number): void {
    const course = this.Courses.find(course => course.id === course_id);
    if (course) {
      course.archieve = 0;
      this.adminService.archieveAndUnarchieveCourse(course_id , course).subscribe();
    }
  }

  addCourse() {
    this.adminService.getAllCourses().subscribe((courses) => {
      const newIdCourse = courses.length ? Math.max(...courses.map(c => c.id_course)) + 1 : 1;
      const newCourse = {
        id_course: newIdCourse,
        course_name: this.newCourseName,
        archieve: 0,
      };

      this.adminService.addCourse(newCourse).subscribe(() => {
        this.message = `Course "${this.newCourseName}" added successfully!`;
        this.newCourseName = '';
      });
    });
  }
}
