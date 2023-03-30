import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../interfaces/register.request';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../../shared/interfaces/user-profile';
import { LoginResponse } from '../interfaces/login-response';
import { Response } from '../../shared/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfile: BehaviorSubject<UserProfile | null>;

  constructor(private readonly http: HttpClient) {
    let user = localStorage.getItem('user');
    if (user) {
      const userProfile = JSON.parse(user) as UserProfile;
      this.userProfile = new BehaviorSubject<UserProfile | null>(userProfile);
    } else {
      this.userProfile = new BehaviorSubject<UserProfile | null>(null);
    }
  }

  private readonly jwtService: JwtHelperService = new JwtHelperService();

  getAccessToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const isTokenExpired = this.jwtService.isTokenExpired(token);
      if (isTokenExpired) {
        this.userProfile.next(null);
        return '';
      }
      return token;
    }
    return '';
  }

  register(registerRequestDto: RegisterRequest) {
    const url = 'http://localhost:3000/api/auth/register';
    return this.http
      .post(url, registerRequestDto)
      .pipe(tap((result) => console.log(result)));
  }

  login(loginRequestDto: LoginRequest) {
    const url = 'http://localhost:3000/api/auth/login';
    return this.http.post(url, loginRequestDto).pipe(
      map((response) => response as Response<LoginResponse>),
      map((response) => response.data),
      tap((response: LoginResponse) => {
        localStorage.setItem('token', response.token);

        const userString = JSON.stringify(response.user);
        localStorage.setItem('user', userString);

        this.userProfile.next(response.user);
      })
    );
  }
}
