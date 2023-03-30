import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from '../courses/course.schema';

export type ClassDocument = HydratedDocument<Class>;

@Schema()
export class Class {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Course.name })
  course: Course;

  @Prop({ required: true })
  price: number;

  @Prop({ require: true, default: false })
  isCompleted: boolean;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
