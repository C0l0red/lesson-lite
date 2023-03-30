import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { RequestUser } from '../common/decorators/request-user.decorator';
import { User } from '../users/user.schema';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateResourceDto } from './dto/create-resource.dto';

@ApiTags('resources')
@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @Roles(Role.TUTOR)
  @Post()
  async create(
    @Body() createResourceDto: CreateResourceDto,
    @RequestUser() user: User,
  ) {
    const data = await this.resourcesService.create(createResourceDto, user);

    return { message: 'Resource added successfully', data };
  }

  @ApiQuery({ name: 'courseId', required: false })
  @Get()
  async find(@RequestUser() user: User, @Query('courseId') courseId: string) {
    const data = await this.resourcesService.find(user, courseId);

    return { message: 'Resources fetched successfully', data };
  }

  @Get(':resourceId')
  async findOne(
    @Param('resourceId') resourceId: string,
    @RequestUser() user: User,
  ) {
    const data = await this.resourcesService.findOne(resourceId, user);

    return { message: 'Resource fetched successfully', data };
  }
}
