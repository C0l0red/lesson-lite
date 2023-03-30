import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/user.schema';
import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from './resource.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CoursesService } from '../courses/courses.service';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name)
    private readonly resourceModel: Model<ResourceDocument>,
    private readonly coursesService: CoursesService,
  ) {}
  async create(createResourceDto: CreateResourceDto, user: User) {
    const course = await this.coursesService.findOne(
      createResourceDto.courseId,
    );
    if (course.tutor.toString() !== user.tutor.toString()) {
      throw new ForbiddenException('You do not own this course');
    }

    const resource = await this.resourceModel.create({
      ...createResourceDto,
      course: new Types.ObjectId(createResourceDto.courseId),
    });

    await this.coursesService.attachResource(course.id, resource);

    return resource;
  }

  async find(user: User, courseId?: string) {
    const courses = await this.coursesService.findForUser(user);

    if (courseId) {
      const userHasCourse = courses.find(
        (course) => course.toString() === courseId,
      );
      if (!userHasCourse)
        throw new ForbiddenException('You do not have access to this course');
    }

    return this.resourceModel.aggregate([
      {
        $match: {
          course: courseId ? new Types.ObjectId(courseId) : { $in: courses },
        },
      },
      { $group: { _id: '$resourceType', resources: { $push: '$$ROOT' } } },
    ]);
  }

  async findOne(resourceId: string, user: User) {
    const courses = await this.coursesService.findForUser(user);

    return this.resourceModel
      .findOne({
        course: { $in: courses },
        _id: new Types.ObjectId(resourceId),
      })
      .then((resource) => {
        if (!resource) throw new NotFoundException('Resource not found');
        return resource;
      });
  }
}
