import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment-service.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-show-progress-specific-course',
  templateUrl: './show-progress-specific-course.component.html',
  styleUrls: ['./show-progress-specific-course.component.css']
})
export class ShowProgressSpecificCourseComponent implements OnInit {
  courseId: number = 0;
  courseName: string = '';
  students: any[] = [];
  assignments: any[] = [];
  grades: any[] = [];
  studentData: any[] = [];
  users: any [] = [];

  
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    this.authService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
      this.fetchCourseDetails();
    });
  }
  

  fetchCourseDetails() {
    this.assignmentService.getCourses().subscribe((courses) => {
      const course = courses.find((c: any) => c.id_course === this.courseId);
      this.courseName = course ? course.course_name : '';
    });

    this.assignmentService.getStudentsByCourse(this.courseId).subscribe((data) => {
      this.students = data;
      console.log("mina"+data[0].id_user);
      this.prepareStudentData();
    });

    this.assignmentService.getAssignments().subscribe((data) => {
      this.assignments = data.filter((assignment) => assignment.id_course === this.courseId);
      this.prepareStudentData();
    });

    this.assignmentService.getGradesByCourse(this.courseId).subscribe((data) => {
      this.grades = data;
      this.prepareStudentData();
    });
  }
  getUserNameById(userId: number): string {
    const user = this.users.find((u) => u.id_user === userId);
    return user ? user.userName  + "   (" + user.email+ ")" : "Unknown";
  }
  
  prepareStudentData() {
    if (this.students.length && this.assignments.length && this.grades.length && this.users.length) {
      this.studentData = this.students.map((student) => {
        const user = this.users.find((u) => u.id_user === student.id_user);
        const userName = user ? user.userName : "Unknown";
        const studentGrades = this.grades.filter(
          (grade) => grade.id_user === student.id_user && grade.id_course === this.courseId
        );
        const gradesMap: { [assignmentId: number]: number | string } = {};
        this.assignments.forEach((assignment) => {
          const grade = studentGrades.find((g) => g.id_assignment === assignment.id_assignment);
          gradesMap[assignment.id_assignment] = grade ? grade.grade : "N/A";
        });
        return {
          id_user: student.id_user,
          name: userName,
          grades: gradesMap,
        };
      });
  
      console.log("Merged Student Data:", this.studentData);
    }
  } 
}