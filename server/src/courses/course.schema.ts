import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tutor } from '../tutors/tutor.schema';
import { Class } from '../classes/class.schema';
import { Resource } from '../resources/resource.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  _id: string;

  @Prop({ type: Types.ObjectId, ref: Tutor.name })
  tutor: Tutor;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'Class' })
  classes: Class[];

  @Prop({ type: [Types.ObjectId], ref: 'Resource' })
  resources: Resource[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
