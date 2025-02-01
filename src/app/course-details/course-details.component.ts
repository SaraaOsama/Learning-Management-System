import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CourseDetailsService } from '../services/course-details.service';

interface Material {
  id_course: number;
  materials: string;
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
  courseId: number = 0;
  materials: Material[] = [];
  grades: any[] = [];
  MinaAssignments: any[] = [];
  combinedArray: any[] = [];
  gradePercentage: number = 0;
  allAnswered: boolean = false;
  all_materials: any[] = [];
  course_id = 1;
  user_id = 1;

  constructor(private route: ActivatedRoute ,private courseDetails: CourseDetailsService) {}

  ngOnInit() {
    this.course_id = +this.route.snapshot.paramMap.get('id_course')!;
    this.user_id = +this.route.snapshot.paramMap.get('user_id')!;

    this.courseDetails.getAllMaterials().subscribe(data => {
      for (let i = 0; i < data.length; i++){
        if(data[i].id_course == this.course_id){
          this.materials.push(data[i]);
        }
      }
    });

    forkJoin({
      assignments: this.courseDetails.getAllAssignments(),
      grades: this.courseDetails.getAllGrades(),
    }).subscribe(({ assignments, grades }) => {
      this.MinaAssignments = assignments.filter((assignment) => assignment.id_course === this.course_id);
      this.grades = grades.filter((grade) => grade.id_course === this.course_id && grade.id_user === this.user_id);
      this.combinedArray = this.MinaAssignments.map((assignment) => {
        const matchingGrade = this.grades.find((grade) => grade.id_assignment === assignment.id_assignment);
        return {
          ...assignment,
          id_user: matchingGrade ? matchingGrade.id_user : null,
          grade: matchingGrade ? matchingGrade.grade : null,
          answearOfStudent: matchingGrade ? matchingGrade.answearOfStudent : "",
        };
      });

      this.calculateGrade();
    });
  }

  submitAnswer(assignment: any, event: Event) {
    event.preventDefault();

    const grade = {
      id_user: this.user_id,
      id_course: this.course_id,
      id_assignment: assignment.id_assignment,
      answearOfStudent: "",
      grade: 0,
    };

    if (!assignment.answearOfStudent || assignment.answearOfStudent.trim() === "") {
      return;
    }

    if (assignment.answearOfStudent === assignment.answear) {
      grade.grade = 1;
      grade.answearOfStudent = assignment.answear;
    } else {
      grade.grade = 0;
      grade.answearOfStudent = assignment.answearOfStudent;
    }

    this.courseDetails.addGrade(grade).subscribe(
      (response) => {
        assignment.grade = grade.grade;
        this.calculateGrade();
        this.checkAllAnswered();
      },
      (error) => {
        console.error("Error posting grade:", error);
      }
    );
  }

  calculateGrade() {
    const totalAssignments = this.combinedArray.length;
    const correctAnswers = this.combinedArray.filter(a => a.grade === 1).length;
    this.gradePercentage = (correctAnswers / totalAssignments) * 100;
    this.allAnswered = this.combinedArray.every(a => a.grade != null);
  }

  checkAllAnswered() {
    this.allAnswered = this.combinedArray.every(a => a.grade != null);
  }
}
