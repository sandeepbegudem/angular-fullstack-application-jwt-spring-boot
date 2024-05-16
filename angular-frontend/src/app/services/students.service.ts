import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageResponse } from '../model/page.response.model';
import { StudentDTO } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public searchStudents(keyword : string, currentPage: number, pageSize: number) : Observable<PageResponse<StudentDTO>> {
    return this.httpClient.get<PageResponse<StudentDTO>>(environment.backendHost + "/students?keyword=" + keyword + "&currentPage=" + currentPage + "&pageSize=" + pageSize);
  }

  public saveStudent(student : StudentDTO) : Observable<StudentDTO> {
    return this.httpClient.post<StudentDTO>(environment.backendHost + "/students", student)
  }

  public deleteStudent(studentId : number) {
    return this.httpClient.delete(environment.backendHost + "/students/" + studentId);
  }
}
