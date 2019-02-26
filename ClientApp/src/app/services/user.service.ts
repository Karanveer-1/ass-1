import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Register } from '../model/register';

const baseUrl:string = "https://localhost:44372";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(reg: Register) {
    return this.http.post<any>(baseUrl + "/api/auth/register", reg)
    .pipe(map(result => {
           return result;
      }));
  }

  isValidUsername(username: string) {
    let headers = new HttpHeaders();    
    headers = headers.set('Content-Type', 'application/json');
    
    return this.http.post<any>(baseUrl + "/api/auth/username", JSON.stringify(username), {headers : headers})
      .pipe(map(result => {
        return result;
      }));
  }
  
  login(username: string, password: string) : Observable<any> {
    return this.http.post<any>(baseUrl + "/api/auth/login", {
      "username": username,
      "password": password
    }).pipe(map(jwt => {
      if (jwt && jwt.token && jwt.role) {
        localStorage.setItem('userToken', jwt.token);
        localStorage.setItem('role', jwt.role);
      }
      return jwt;
    }));
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
  }

  public isAdmin(): boolean {
    return localStorage.getItem('role') == 'Admin';
  }
}
