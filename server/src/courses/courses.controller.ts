import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../users/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(Role.TUTOR)
  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @RequestUser() user: Partial<User>,
  ) {
    const data = await this.coursesService.create(createCourseDto, user);

    return { message: 'Course created successfully', data };
  }

  @Get()
  async find() {
    const data = await this.coursesService.find();

    return { message: 'Courses fetched successfully', data };
  }

  @Get(':courseId')
  async findOne(@Param('courseId') courseId: string) {
    const data = await this.coursesService.findOne(courseId);

    return { message: 'Course fetched successfully', data };
  }

  @Roles(Role.STUDENT)
  @Post(':courseId/subscription')
  async subscribe(
    @Param('courseId') courseId: string,
    @RequestUser() user: User,
  ) {
    const data = await this.coursesService.subscribe(courseId, user);

    return { message: 'Course subscribed to. Here is the breakdown', data };
  }
}
