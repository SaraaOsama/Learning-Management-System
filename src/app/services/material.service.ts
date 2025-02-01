import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material';

@Injectable({
  providedIn: 'root'
})


export class MaterialService {
  
  private materialsUrl = 'http://localhost:3000/materials';
  private coursesUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialsUrl);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.coursesUrl);
  }

  addMaterial(material: Material): Observable<any> {
    return this.http.post(this.materialsUrl, material);
  }
}
