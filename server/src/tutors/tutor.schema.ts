import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/course.schema';

export type TutorDocument = HydratedDocument<Tutor>;

@Schema()
export class Tutor {
  _id: Types.ObjectId;

  @Prop({ unique: true, required: true, type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: [Types.ObjectId], ref: 'Course' })
  courses: Course[];
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
