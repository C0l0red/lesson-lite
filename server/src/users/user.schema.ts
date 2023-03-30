import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from './enums/role.enum';
import { Tutor } from '../tutors/tutor.schema';
import { Student } from '../students/student.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ require: true })
  fullName: string;

  @Prop({ enum: Role })
  role: Role;

  @Prop({ type: Types.ObjectId, ref: 'Tutor' })
  tutor: Tutor | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student' })
  student: Student | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
