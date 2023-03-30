import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tutor, TutorDocument } from './tutor.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TutorsService {
  constructor(
    @InjectModel(Tutor.name) private readonly tutorModel: Model<TutorDocument>,
  ) {}

  async getCourses(
    tutorId: Types.ObjectId,
  ): Promise<Pick<Tutor, '_id' | 'courses'>> {
    return this.tutorModel.findById(tutorId, ['courses']).then((tutor) => {
      if (!tutor) throw new NotFoundException('Tutor not found');
      return tutor;
    });
  }

  async attachCourse(tutorId: Types.ObjectId, courseId: string) {
    await this.tutorModel.updateOne(
      { _id: tutorId },
      { $push: { courses: courseId } },
    );
  }

  async create(userId: Types.ObjectId) {
    return this.tutorModel.create({ user: userId });
  }
}
