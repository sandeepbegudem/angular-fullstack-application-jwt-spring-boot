import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstructorDTO } from '../model/instructor.model';
import { PageResponse } from '../model/page.response.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(
    private httpClient:HttpClient
  ) { }

  public searchInstructors(keyword: string, currentPage: number, pageSize: number) : Observable<PageResponse<InstructorDTO>>{
    return this.httpClient.get<PageResponse<InstructorDTO>>(environment.backendHost+"/instructors?keyword=" + keyword+ "&currentPage=" + currentPage + "&pageSize=" + pageSize);
  }

  public findAllInstructors(): Observable<Array<InstructorDTO>> {
    return this.httpClient.get<Array<InstructorDTO>>(environment.backendHost + "/instructors/all");
  }

  public deleteInstructor(instructorId : number) {
    return this.httpClient.delete(environment.backendHost + "/instructors/" + instructorId);
  }

  public saveInstructor(instructor : InstructorDTO) : Observable<InstructorDTO> {
    return this.httpClient.post<InstructorDTO>(environment.backendHost + "/instructors", instructor)
  }
  
}
