import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

    API = "http://localhost:3000"

    checkLogin(email: string , password: string): Observable<any[]>{
      return this.http.get<any[]>(`${this.API}/users?email=${email}&password=${password}`)
    }

    getAllUsers(): Observable<any[]>{
      return this.http.get<any[]>(`${this.API}/users`);
    }

    getUserByEmail(email: string) :Observable<any[]>{
      return this.http.get<any[]>(`${this.API}/users?email=${email}`);
    }

    addUser(signupData : any) :Observable<any>{
      return this.http.post<any>(`${this.API}/users`, signupData);
    }


}
