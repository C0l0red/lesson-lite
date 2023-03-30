import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './enums/role.enum';
import { StudentsService } from '../students/students.service';
import { TutorsService } from '../tutors/tutors.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly studentsService: StudentsService,
    private readonly tutorsService: TutorsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    await this.findByEmail(createUserDto.email).then((user) => {
      if (user)
        throw new ConflictException('User with that email already exists');
    });

    const password = await this.hashPassword(createUserDto.password);

    const user = await this.userModel.create({ ...createUserDto, password });

    if (user.role === Role.STUDENT) {
      const student = await this.studentsService.create(user._id);
      user.student = student._id;
    } else {
      const tutor = await this.tutorsService.create(user._id);
      user.tutor = tutor._id;
    }

    await user.save();

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  private async hashPassword(plainPassword: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(plainPassword, saltOrRounds);
  }

  async verifyPassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }
}
