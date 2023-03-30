import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCourseRequest } from '../interfaces/create-course-request';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly baseUrl = 'http://localhost:3000/api/courses';
  constructor(private readonly http: HttpClient) {}

  create(createCourseRequest: CreateCourseRequest) {
    const url = this.baseUrl;

    return this.http.post(url, createCourseRequest).pipe();
  }
}
