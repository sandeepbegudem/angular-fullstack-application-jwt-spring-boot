import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { PageResponse } from 'src/app/model/page.response.model';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-student',
  templateUrl: './courses-student.component.html',
  styleUrls: ['./courses-student.component.css']
})
export class CoursesStudentComponent implements OnInit {

  studentId!: number;
  pageCourses!: Observable<PageResponse<Course>>;
  currentPage: number=0;
  pageSize: number=5;
  errorMessage! : string;

  pageOtherCourses!: Observable<PageResponse<Course>>;
  otherCoursescurrentPage : number=0;
  otherCoursesPageSize: number=5;
  otherErrorMessage! : string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.handleSearchStudentCourses();
    this.handleSearchNonEnrolledInCourses();
  }

  handleSearchStudentCourses() {
    this.pageCourses = this.courseService.getCoursesByStudent(this.studentId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  gotoPage(page : number) {
    this.currentPage = page;
    this.handleSearchStudentCourses();
  }

  handleSearchNonEnrolledInCourses() {
    this.pageOtherCourses = this.courseService.getNonEnrolledInCoursesByStudent(this.studentId, this.otherCoursescurrentPage, this.otherCoursesPageSize).pipe(
      catchError(err => {
        this.otherErrorMessage = err.message;
        return throwError(err);
      })
    )
  }

  gotoPageOtherCourses(page : number) {
    this.otherCoursescurrentPage = page;
    this.handleSearchNonEnrolledInCourses();
  }

  enrollIn(c : Course) {
    this.courseService.enrollStudentInCourse(c.courseId, this.studentId).subscribe({
      next: () => {
        this.handleSearchStudentCourses();
        this.handleSearchNonEnrolledInCourses();
      }, error : err => {
        alert(err.message);
        console.log(err)
      }
    })
  }

}
