import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/courses`)
  }

  deleteCourse(course_id: number):Observable<any>{
    return this.http.delete(`${this.API}/${course_id}`)
  }

  archieveAndUnarchieveCourse(course_id: number , course: any): Observable<any>{
    return this.http.put(`${this.API}/courses/${course_id}`, course);
  }

  addCourse(newCourse: any): Observable<any>{
    return this.http.post(`${this.API}/courses`, newCourse)
  }

  getAllUsers() : Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/users`)
  }

  getAllUserCourses(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/user_course`)
  }

  deleteUser(id_user: number) : Observable<any>{
    return this.http.delete(`${this.API}/users/${id_user}`)
  }

  ActiveUser(id_user: number , user: any) : Observable<any>{
    return this.http.put(`${this.API}/users/${id_user}`, user)
  }

  deleteUserCourse(id : string) : Observable<any>{
    return this.http.delete(`${this.API}/user_course/${id}`)
  }

  addUserCourse(user_course: any){
    this.http.post(`${this.API}/user_course`, user_course)
  }
}
