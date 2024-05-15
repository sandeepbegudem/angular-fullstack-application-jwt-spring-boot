import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, throwError } from 'rxjs';
import { PageResponse } from 'src/app/model/page.response.model';
import { StudentDTO } from 'src/app/model/student.model';
import { InstructorsService } from 'src/app/services/instructors.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})


export class StudentsComponent implements OnInit {

  searchFormGroup!: FormGroup;
  pageStudents!: Observable<PageResponse<StudentDTO>>

  errorMessage!: string;
  currentPage : number = 0;
  pageSize : number = 5;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private instructorService: InstructorsService,
    private studentService : StudentsService
    ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    this.handleSearchStudents();
  }


  getModal(content: any) {
    this.modalService.open(content, { size: 'xl' })
    console.log("Hello world")
  }

  handleSearchStudents() {
    let keyword = this.searchFormGroup.value.keyword
    this.pageStudents = this.studentService.searchStudents(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
  }

  gotoPage(page : number) {
    this.currentPage = page;
    this.handleSearchStudents();
  }

}
