import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentsModel: Model<StudentDocument>,
  ) {}

  async create(userId: Types.ObjectId) {
    return this.studentsModel.create({ user: userId });
  }

  async getCourses(
    studentId: Types.ObjectId,
  ): Promise<Pick<Student, '_id' | 'courses'>> {
    return this.studentsModel
      .findById(studentId, ['courses'])
      .then((student) => {
        if (!student) throw new NotFoundException('Student not found');
        return student;
      });
  }

  async attachCourse(studentId: Types.ObjectId, courseId: any) {
    await this.studentsModel
      .findOne({ _id: studentId, courses: { $in: courseId } })
      .then(async (student) => {
        if (student) return;

        await this.studentsModel.updateOne(
          { _id: studentId },
          { $push: { courses: courseId } },
        );
      });
  }
}
