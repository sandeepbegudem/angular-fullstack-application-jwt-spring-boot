import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course.model';
import { PageResponse } from '../model/page.response.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public searchCourses(keyword: string, currentPage: number, pageSize: number) : Observable<PageResponse<Course>> {
    return this.httpClient.get<PageResponse<Course>>(environment.backendHost+"/courses?keyword="+keyword+"&page="+currentPage+"&size="+pageSize);
  } 

  public deleteCourse(courseId: number) {
    return this.httpClient.delete(environment.backendHost+"/courses/"+courseId)
  }

  public saveCourse(course: Course) : Observable<Course> {
    return this.httpClient.post<Course>(environment.backendHost+"/courses", course);
  }

  public getCoursesByInstructorId(instructorId: number, currentPage: number, pageSize: number) : Observable<PageResponse<Course>> {
    return this.httpClient.get<PageResponse<Course>>(environment.backendHost+"/instructors/" + instructorId + "/courses?currentPage=" + currentPage + "&pageSize=" + pageSize)
  }

  public updateCourse(course: Course, courseId: number): Observable<Course> {
    return this.httpClient.put<Course>(environment.backendHost + "/courses/" + courseId, course);
  }
  
  public getCoursesByStudent(studentId : number, currentPage : number, pageSize : number)  : Observable<PageResponse<Course>> {
    return this.httpClient.get<PageResponse<Course>>(environment.backendHost + "/students/" + studentId + "/courses?currentPage=" + currentPage + "&pageSize=" + pageSize);
  }
}
