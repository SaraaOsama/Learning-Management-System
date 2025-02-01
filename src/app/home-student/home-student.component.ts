// import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CoursesService } from '../courses.service';
// @Component({
//   selector: 'app-home-student',
//   templateUrl: './home-student.component.html',
//   styleUrls: ['./home-student.component.css']
// })
// export class HomeStudentComponent implements OnInit{

//   courses: any[] = [];
//   all_courses: any[] = [];
//   user_id = 1;
//   constructor( private route: ActivatedRoute,private coursesService: CoursesService) {}

//   ngOnInit() {
//     this.user_id = +this.route.snapshot.paramMap.get('user_id')!;
//     this.coursesService.getAllCourses().subscribe(data => {
//         this.all_courses = data;
//     });

//     this.coursesService.getAllUsersCourses().subscribe(data => {
//       for (let i = 0; i < data.length; i++) {
//           if(data[i].id_user == this.user_id){
//             console.log(data[i]);

//               if(this.getCourseById(data[i].id_course).archieve != 1){
//                 this.courses.push(this.getCourseById(data[i].id_course));
//               }            
//           }
//       }
//     })
//   }

//   getCourseById(course_id : number) : any {
//     return this.all_courses.find(course => course.id_course === course_id);
//   }
// }
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.css']
})
export class HomeStudentComponent implements OnInit{

  courses: any[] = [];
  all_courses: any[] = [];
  user_id = 1;
  constructor(private http: HttpClient , private route: ActivatedRoute) {}

  ngOnInit() {
    this.user_id = +this.route.snapshot.paramMap.get('user_id')!;
    this.http.get<any>("http://localhost:3000/courses").subscribe(data => {
        this.all_courses = data;
    });

    this.http.get<any>("http://localhost:3000/user_course").subscribe(data => {
      for (let i = 0; i < data.length; i++) {
          if(data[i].id_user == this.user_id){
            console.log(data[i]);

              if(this.getCourseById(data[i].id_course).archieve != 1){
                this.courses.push(this.getCourseById(data[i].id_course));
              }            
          }
      }
    })
  }

  getCourseById(course_id : number) : any {
    return this.all_courses.find(course => course.id_course === course_id);
  }
}
