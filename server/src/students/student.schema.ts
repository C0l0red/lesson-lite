import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from '../courses/course.schema';
import { User } from '../users/user.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student {
  _id: Types.ObjectId;

  @Prop({ unique: true, required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [Types.ObjectId], ref: Course.name })
  courses: Course[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
