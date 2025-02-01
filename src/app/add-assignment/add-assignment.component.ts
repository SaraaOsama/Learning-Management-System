import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment-service.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  newAssignment: Assignment = {
    id_course: 0,
    id_assignment: 0,
    assignment: '',
    answear: '',
  };

  courses: any[] = [];
  successMessage: string = '';
  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit() {
    this.assignmentService.getCourses().subscribe((data) => {
      this.courses = data;
    });

    this.assignmentService.getAssignments().subscribe((data) => {
      this.assignments = data;
    });
  }

  getCourseName(courseId: number): string {
    const selectedCourse = this.courses.find(course => course.id_course === courseId);
    return selectedCourse ? selectedCourse.course_name : '';
  }

  getNextAssignmentId(courseId: number): number {
    const courseAssignments = this.assignments.filter(
      (assignment) => assignment.id_course == courseId
    );

    if (courseAssignments.length == 0) {
      return 1;
    }

    const maxId = Math.max(
      ...courseAssignments.map((assignment) => assignment.id_assignment)
    );

    return maxId + 1;
  }

  addAssignment() {
    if (this.newAssignment.assignment.trim() && this.newAssignment.id_course) {
      this.newAssignment.id_course = +this.newAssignment.id_course;
      this.newAssignment.id_assignment = this.getNextAssignmentId(this.newAssignment.id_course);

      const maxId = this.assignments.reduce((max, assignment) => 
        assignment.id_assignment ? Math.max(max, assignment.id_assignment) : max, 0);
      this.assignmentService.addAssignment(this.newAssignment);

      this.successMessage = 'Assignment added successfully!';
      this.newAssignment = {
        id_course: 0,
        id_assignment: 0,
        assignment: '',
        answear: '',
      };
    } else {
      this.successMessage = 'Please fill out all fields!';
    }
  }
}
