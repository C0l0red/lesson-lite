import { CreateClassRequest } from './create-class-request';

export interface CreateCourseRequest {
  name: string;
  description: string;
  classes: CreateClassRequest[];
}
