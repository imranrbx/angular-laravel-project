import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  config = new Configuration();
  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.checkStatus.asObservable();
  constructor(private http: HttpClient, private jwtHelp: JwtHelperService) {}
  checkLogin() {
    const token = localStorage.getItem('access_token');
    if (token && !this.jwtHelp.isTokenExpired()) {
      this.checkStatus.next(true);
    } else {
      this.checkStatus.next(false);
    }
  }
  registerUser(user: any) {
    return this.http.post(this.config.apiUrl + '/register', user);
  }
  loginUser(user: any) {
    this.http.post(this.config.apiUrl + '/login', user).subscribe(
      (checkUser: any) => {
        if (checkUser.access_token) {
          window.alert(`${checkUser.user.name} Logged In Successfully`);
          localStorage.setItem('access_token', checkUser.access_token);
          localStorage.setItem('user', JSON.stringify(checkUser.user));
          this.checkLogin();
        }
      },
      (error: HttpErrorResponse) => {
        window.alert(`${error.statusText} Access`);
      },
    );
  }
  logoutUser() {
    return this.http
      .post(this.config.apiUrl + '/logout', {})
      .subscribe((message: any) => {
        if (message) {
          window.alert(message.message);
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.checkLogin();
        }
      });
  }
  me() {
    return this.http.get(`${this.config.apiUrl}/me`);
  }
  updateUser(user: any) {
    return this.http.post(this.config.apiUrl + '/update', user);
  }
}
