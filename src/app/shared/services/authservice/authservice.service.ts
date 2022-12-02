import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Subject, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { user } from 'src/app/appModels/user.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  User = new Subject<user>();
  private tokenExpirationTimer: any;

  constructor(private Http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  Authentication(email: string, password: string) {

    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/login?email=${email}&password=${password}`).pipe(
      catchError(this.errorHandler),
      tap((data: any) => {
        const member = data['user'];
        this.AuthenticateUser(member.firstName, member.lastName, member.gender, member.dateOfBirth, member.email, member.contactNumber, data['token'], 1);
      })
    );
  }

  Registration(form: FormGroup) {
    return this.Http.post(`http://20.72.141.14/api/v1.0/tweets/register`, form).pipe(
      catchError(this.errorHandler),
      tap((data: any) => {
        const member = data;
        this.AuthenticateUser(member.firstName, member.lastName, member.gender, member.dateOfBirth, member.email, member.contactNumber, data['token'], 1);
      })
    );
  }

  ForgotPassword(email: string, dateOfBirth: Date) {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/forgotpassword?Email=${email}&DateOfBirth=${dateOfBirth}`).pipe(
      catchError(this.errorHandler)
    );
  }

  ResetPassword(email: string, password: string, confirmpassword: string) {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/resetpassword?Email=${email}&NewPassword=${password}&ConfirmPassword=${confirmpassword}`).pipe(
      catchError(this.errorHandler),
      tap((data: any) => {
        const member = data['user'];
        this.AuthenticateUser(member.firstName, member.lastName, member.gender, member.dateOfBirth, member.email, member.contactNumber, data['token'], 1);
      })
    );
  }

  PostTweet(form: FormGroup) {
    return this.Http.post(`http://20.72.141.14/api/v1.0/tweets/add`, form).pipe(
      catchError(this.errorHandler));
  }

  PostComment(form: FormGroup) {
    return this.Http.post(`http://20.72.141.14/api/v1.0/tweets/reply`, form).pipe(
      catchError(this.errorHandler));
  }

  GetAllUsers() {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/users/all`).pipe(
      catchError(this.errorHandler)
    );
  }

  SearchUser(username: string) {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/user/search/${username}`).pipe(
      catchError(this.errorHandler)
    );
  }

  GetAllTweets() {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/all`).pipe(
      catchError(this.errorHandler)
    );
  }

  GetReplies(id: number) {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/replies/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  GetAllTweetsof(username: string) {
    return this.Http.get(`http://20.72.141.14/api/v1.0/tweets/${username}`).pipe(
      catchError(this.errorHandler)
    );
  }

  LikeTweet(username: string, id: number) {
    return this.Http.put(`http://20.72.141.14/api/v1.0/tweets/${username}/like/${id}`, username).pipe(
      catchError(this.errorHandler)
    );
  }

  EditTweet(form: FormGroup) {
    return this.Http.put(`http://20.72.141.14/api/v1.0/tweets/updatetweet`, form).pipe(
      catchError(this.errorHandler)
    );
  }

  DeleteTweet(id: number, username: string) {
    return this.Http.delete(`http://20.72.141.14/api/v1.0/tweets/${username}/delete?tweetId=${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";
    return throwError(errorRes);
  }

  autoLogout(expiresInDur: number) {
    const token = localStorage.getItem('access-token');
    this.tokenExpirationTimer = setTimeout(() => {
      this.Logout();
    }, +expiresInDur);

  }

  Logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['/login']);
  }

  private AuthenticateUser(firstName: string, lastName: string, gender: string, dateOfBirth: Date, email: string, contactNumber: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + ((expiresIn * 1000) * 60) * 60);
    console.log(expirationDate);
    console.log(+expirationDate);
    const newuser = new user(firstName, lastName, gender, dateOfBirth, email, contactNumber, token, expirationDate);
    console.log('user =>', newuser);

    this.User.next(newuser);
    localStorage.setItem('user', JSON.stringify(newuser));
    //this.autoLogout(+expirationDate);
  }

  isAuthenticated() {
    if (localStorage.getItem('access-token') != null && localStorage.getItem('user') != null) {
      const token = localStorage.getItem('access-token');
      return !this.jwtHelper.isTokenExpired(token!);
    } else {
      return false;
    }
  }
}


