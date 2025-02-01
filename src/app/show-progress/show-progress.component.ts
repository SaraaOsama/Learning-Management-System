import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from '../assignment-service.service';
@Component({
  selector: 'app-show-progress',
  templateUrl: './show-progress.component.html',
  styleUrls: ['./show-progress.component.css']
})
export class ShowProgressComponent implements OnInit {
  courses: any[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.assignmentService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/show-specific-progress', courseId]);
  }
}