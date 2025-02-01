import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Coursee } from './course.model';
import { Router } from '@angular/router';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-icourses',
  styleUrls: ['./icourses.component.css'],
  templateUrl: './icourses.component.html',
})
export class IcoursesComponent implements OnInit {
  courses: any[] = [];
  newCourse: Coursee = { course_name: '' ,archieve:0};
  editCourse: Coursee | null = null;
  newCourseName: string = '';
  constructor(private coursesService: CoursesService, 
              private router: Router, 
              private materialService: MaterialService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (data) => this.courses = data,
      (error) => console.error('Error fetching courses:', error)
    );
  }

  addCourse() {
    this.materialService.getCourses().subscribe((courses) => {
      const newIdCourse = courses.length ? Math.max(...courses.map(c => c.id_course)) + 1 : 1;
      const newCourse = {
        id_course: newIdCourse,
        course_name: this.newCourse.course_name,
        archieve: 0
      };

      this.coursesService.postCourse(newCourse).subscribe(() => {
        this.courses.push(newCourse);
        this.newCourse.course_name = '';
      });
    });
  }

  updateCourse(): void {
    if (!this.editCourse) return;
    this.coursesService.updateCourse(this.editCourse).subscribe(
      (updatedCourse) => {
        const index = this.courses.findIndex(c => c.id_course === updatedCourse.id_course);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
        }
        this.editCourse = null;
      },
      (error) => console.error('Error updating course:', error)
    );
  }

  deleteCourse(courseId: string): void {
    this.coursesService.deleteCourse(courseId).subscribe(
      () => {
        this.courses = this.courses.filter(course => course.id !== courseId);
      },
      (error) => console.error('Error deleting course:', error)
    );
  }

  enableEdit(course: Coursee): void {
    this.editCourse = { ...course };
  }

  cancelEdit(): void {
    this.editCourse = null;
  }
  navigateToAddAssignment(): void {
    this.router.navigate(['/add-assignment']);
  }
  navigateToAddMaterial(): void {
    this.router.navigate(['/add-material']);
  }

  showProgress():void{
    this.router.navigate(['/show-progress']);
  }

  archieveCourse(course_id: string): void {
    const course = this.courses.find(course => course.id === course_id);
    if (course) {
      course.archieve = 1;
      this.coursesService.archieveAndUnarchieveCourse(course_id,course).subscribe();
    }
  }

  unarchieveCourse(course_id: string): void {
    const course = this.courses.find(course => course.id === course_id);
    if (course) {
      course.archieve = 0;
      this.coursesService.archieveAndUnarchieveCourse(course_id,course).subscribe();
    }
  }
}

