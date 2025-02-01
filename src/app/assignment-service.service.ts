import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignment } from './add-assignment/assignment.model';
import { Course, Courseee } from './add-assignment/course.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private baseUrl = 'http://localhost:3000';

  private assignmentsSubject = new BehaviorSubject<Assignment[]>([]);
  assignments$ = this.assignmentsSubject.asObservable();

  constructor(private http: HttpClient) {}
  getCourses() {
    return this.http.get<Courseee[]>(`${this.baseUrl}/courses`);
  }

  getAssignments() {
    return this.http.get<Assignment[]>(`${this.baseUrl}/assignment`);
  }

  addAssignment(newAssignment: Assignment) {
    this.http.post<Assignment>(`${this.baseUrl}/assignment`, newAssignment).subscribe(() => {
      this.getAssignments().subscribe(assignments => {
        this.assignmentsSubject.next(assignments);
      });
    });
  }

  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user_course?id_course=${courseId}`);
  }
  getGradesByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/grades?id_course=${courseId}`);
  }
}
