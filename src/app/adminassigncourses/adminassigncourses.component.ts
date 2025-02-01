import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminassigncourses',
  templateUrl: './adminassigncourses.component.html',
  styleUrls: ['./adminassigncourses.component.css']
})
export class AdminassigncoursesComponent implements OnInit {
  apiUrl = 'http://localhost:3000'; // Base URL for JSON Server
  users: any[] = [];
  courses: any[] = [];
  userCourses: any[] = [];
  selectedUserId: number | null = null;
  selectedUserCourses: Set<number> = new Set();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
    this.loadCourses();
    this.loadUserCourses();
  }

  loadUsers() {
    this.http.get(`${this.apiUrl}/users`).subscribe((data: any) => {
      this.users = data.filter((user: any) => user.role === 0);
    });
  }

  loadCourses() {
    this.http.get(`${this.apiUrl}/courses`).subscribe((data: any) => {
      this.courses = data;
    });
  }

  loadUserCourses() {
    this.http.get(`${this.apiUrl}/user_course`).subscribe((data: any) => {
      this.userCourses = data;
    });
  }

  openUserCourses(userId: number) {
    this.selectedUserId = userId;
    this.selectedUserCourses = new Set(
      this.userCourses
        .filter((uc: any) => uc.id_user === userId)
        .map((uc: any) => uc.id_course)
    );
  }

  toggleCourseAssignment(courseId: number, event: any) {
    if (event.target.checked) {
      this.selectedUserCourses.add(courseId);
    } else {
      this.selectedUserCourses.delete(courseId);
    }
  }

  saveAssignments() {
    if (this.selectedUserId === null) {
      return;
    }

    // Current assignments in JSON
    const currentAssignments = this.userCourses.filter(
      (uc: any) => uc.id_user === this.selectedUserId
    );

    // Calculate additions and removals
    const currentCourseIds = new Set(currentAssignments.map((uc: any) => uc.id_course));
    const newAssignments = Array.from(this.selectedUserCourses).filter(
      (courseId) => !currentCourseIds.has(courseId)
    );
    const removedAssignments = Array.from(currentCourseIds).filter(
      (courseId) => !this.selectedUserCourses.has(courseId)
    );

    // Prepare API calls
    const postRequests = newAssignments.map((courseId) =>
      this.http
        .post(`${this.apiUrl}/user_course`, {
          id_user: this.selectedUserId,
          id_course: courseId,
          id: this.generateUniqueId(),
        })
        .toPromise()
    );

    const deleteRequests = removedAssignments.map((courseId) => {
      const assignment = currentAssignments.find((uc: any) => uc.id_course === courseId);
      return this.http
        .delete(`${this.apiUrl}/user_course/${assignment.id}`)
        .toPromise();
    });

    // Execute all API calls
    Promise.all([...postRequests, ...deleteRequests]).then(() => {
      alert('Changes saved successfully!');
      this.loadUserCourses(); // Reload user_courses to sync with JSON
    });
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 8); // Generate random ID
  }
}