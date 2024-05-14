import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstructorsService } from 'src/app/services/instructors.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})


export class StudentsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder, private instructorService: InstructorsService
    ) {}

  ngOnInit(): void {
  }


  getModal(content: any) {
    this.modalService.open(content, { size: 'xl' })
    console.log("Hello world")
  }


}
