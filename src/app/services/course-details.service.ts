import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

  API = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getAllMaterials(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/materials`);
  }

  getAllAssignments(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/assignment`);
  }
  getAllGrades(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/grades`);
  }

  addGrade(grade: any):Observable<any>{
    return this.http.post<any>(`${this.API}/grades`, grade)
  }

}
