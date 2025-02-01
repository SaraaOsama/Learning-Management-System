import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import { Material } from '../services/material'

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  newMaterial: Material = {
    id_course: 0,
    materials: '',
    id: ''
  };

  courses: any[] = [];
  successMessage: string = '';
  materials: Material[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.materialService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  getCourseName(courseId: number): string {
    const selectedCourse = this.courses.find(course => course.id_course === courseId);
    return selectedCourse ? selectedCourse.course_name : '';
  }

  addMaterial() {
    if (this.newMaterial.materials.trim() && this.newMaterial.id_course) {
      this.newMaterial.id_course = +this.newMaterial.id_course;
      this.newMaterial.id = Math.random().toString(36).substring(2, 10);
      this.materialService.addMaterial(this.newMaterial).subscribe(() => {
        this.successMessage = 'Material added successfully!';
        this.newMaterial = {
          id_course: 0,
          materials: '',
          id: ''
        };
      });
    } else {
      this.successMessage = 'Please fill out all fields!';
    }
  }
}
