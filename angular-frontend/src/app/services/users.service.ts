import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient : HttpClient
  ) { }

  public checkIfEmailExist(email : String) : Observable<boolean> {
    return this.httpClient.get<boolean>(environment.backendHost + "/users?email=" + email)
  }
}
