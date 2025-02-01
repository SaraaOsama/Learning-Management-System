
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course ,Coursee } from './icourses/course.model'; 

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000/courses';

  constructor(private httpClient: HttpClient) {}

  
  getAllCourses(): Observable<Coursee[]> {
    return this.httpClient.get<Coursee[]>(this.baseUrl);
  }

  
  getCourseById(courseId: number): Observable<Coursee> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.httpClient.get<Coursee>(url);
  }


  addCourse(newCourse: Coursee): Observable<Coursee> {
    return this.httpClient.post<Coursee>(this.baseUrl, newCourse);
  }

  updateCourse(updatedCourse: any): Observable<any> {
    if (!updatedCourse.id_course) {
      throw new Error('Course ID is required for update.');
    }
    const url = `${this.baseUrl}/${updatedCourse.id}`;
    return this.httpClient.put<any>(url, updatedCourse);
  }

  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.baseUrl}/${courseId}`;
    return this.httpClient.delete(url);
  }

  postCourse(newCourse: any) : Observable<any>{
    return this.httpClient.post(this.baseUrl, newCourse);
  }

  archieveAndUnarchieveCourse(course_id: string , course: any): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/${course_id}`, course);
  }

  getAllUsersCourses():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseUrl}/user_course`);
  }
} 