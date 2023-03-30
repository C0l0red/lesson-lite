import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './course.schema';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../users/user.schema';
import { ClassesService } from '../classes/classes.service';
import { Role } from '../users/enums/role.enum';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';
import { Resource } from '../resources/resource.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly classesService: ClassesService,
    private readonly studentsService: StudentsService,
    private readonly tutorsService: TutorsService,
  ) {}

  async create(createCourseDto: CreateCourseDto, user: Partial<User>) {
    const course = await this.courseModel.create({
      name: createCourseDto.name,
      tutor: user.tutor,
      description: createCourseDto.description,
    });

    course.classes = (
      await this.classesService.createMany(createCourseDto.classes)
    ).map((_class) => _class.id);

    await this.tutorsService.attachCourse(
      user.tutor as Types.ObjectId,
      course.id,
    );

    return course.save();
  }

  async find() {
    return this.courseModel.find().populate('classes').sort('-createdAt');
  }

  async findOne(courseId: string) {
    return this.courseModel
      .findById(courseId)
      .populate('classes')
      .then((course) => {
        if (!course) throw new NotFoundException('Course Not Found');
        return course;
      });
  }

  async findForUser(user: User) {
    if (user.role === Role.STUDENT) {
      return this.studentsService
        .getCourses(user.student as Types.ObjectId)
        .then((student) => student.courses);
    } else {
      return this.tutorsService
        .getCourses(user.tutor as Types.ObjectId)
        .then((tutor) => tutor.courses);
    }
  }

  async subscribe(courseId: string, user: User) {
    const course = await this.findOne(courseId);

    await this.studentsService.attachCourse(
      user.student as Types.ObjectId,
      course.id,
    );

    const response: Record<string, any> = {
      name: course.name,
      description: course.description,
    };

    response.classMissed = course.classes
      .filter((_class) => _class.isCompleted)
      .map((_class) => ({
        name: _class.name,
        description: _class.description,
        price: _class.price,
      }));

    response.classesLeft = course.classes
      .filter((_class) => !_class.isCompleted)
      .map((_class) => ({
        name: _class.name,
        description: _class.description,
        price: _class.price,
      }));

    response.yourBill = course.classes
      .filter((_class) => !_class.isCompleted)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price;
      }, 0);

    return response;
  }

  async attachResource(courseId: Types.ObjectId, resource: Resource) {
    await this.courseModel.updateOne(
      { _id: courseId },
      { $push: { resources: resource._id } },
    );
  }
}
