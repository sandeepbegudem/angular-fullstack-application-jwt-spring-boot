import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { contains } from 'jquery';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { InstructorDTO } from 'src/app/model/instructor.model';
import { PageResponse } from 'src/app/model/page.response.model';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-instructor',
  templateUrl: './courses-instructor.component.html',
  styleUrls: ['./courses-instructor.component.css']
})
export class CoursesInstructorComponent implements OnInit {
  instructorId!: number;
  currentInstructor!: InstructorDTO;
  pageCourses!: Observable<PageResponse<Course>>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;
  submitted: boolean = false;
  courseFormGroup!: FormGroup;
  updateCourseFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute, private courseService: CoursesService, private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.instructorId = this.route.snapshot.params['id'];
    this.fillCurrentInstructor();
    this.handleSearchInstructorCourses();
  }

  private fillCurrentInstructor() {
    this.currentInstructor = {
      instructorId: this.instructorId,
      firstName: "",
      lastName: "",
      summary: "",
      userDTO: {email: "", password: ""}
    }
  }

  private handleSearchInstructorCourses() {
    this.pageCourses = this.courseService.getCoursesByInstructorId(this.instructorId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchInstructorCourses();
  }

  getModal(content: any) {
    this.submitted = false;
    this.courseFormGroup = this.fb.group({
      courseName: ["", Validators.required],
      courseDuration: ["", Validators.required],
      courseDescription: ["", Validators.required],
      instructorDTO: [this.currentInstructor, Validators.required],
    })
    this.modalService.open(content, {size: 'xl'});
  }

  onCloseModal(modal: any) {
    modal.close();
    this.courseFormGroup.reset();
  }

  onSaveCourse(modal: any) {
    this.submitted = true;
    if (this.courseFormGroup.invalid) return;
    this.courseService.saveCourse(this.courseFormGroup.value).subscribe({
      next: () => {
        alert("Success Saving Course");
        this.handleSearchInstructorCourses();
        this.courseFormGroup.reset();
        this.submitted = false;
        modal.close();
      }, error: err => {
        alert(err.message);
        console.log(err);
      }
    })
  }

  getUpdateModal(c: Course, updateContent: any) {
    this.updateCourseFormGroup = this.fb.group({
      courseId: [c.courseId, Validators.required],
      courseName: [c.courseName, Validators.required],
      courseDuration: [c.courseDuration, Validators.required],
      courseDescription: [c.courseDescription, Validators.required],
      instructorDTO: [c.instructorDTO, Validators.required],
    })
    this.modalService.open(updateContent, {size:'xl'})

  }

  onCloseUpdateModal(updateModal : any) {
    updateModal.close();
    this.updateCourseFormGroup.reset();
    
  }

  onUpdateCourse(updateModal : any) {
    console.log(this.updateCourseFormGroup.value)
    this.submitted = true;
    if(this.updateCourseFormGroup.invalid) return;
    this.courseService.updateCourse(this.updateCourseFormGroup.value, this.updateCourseFormGroup.value.courseId).subscribe({
      next: () =>{
        alert("Success Updating Course!")
        this.handleSearchInstructorCourses();
        this.submitted = false
        updateModal.close();
      }, error: err => {
        alert(err.message);
        console.log(err)
      }
    })

  }
}