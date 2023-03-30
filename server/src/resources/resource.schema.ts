import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResourceType } from './enums/resource-type.enum';
import { Course } from '../courses/course.schema';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: ResourceType })
  resourceType: ResourceType;

  @Prop({ required: true, type: Types.ObjectId, ref: Course.name })
  course: Course;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
