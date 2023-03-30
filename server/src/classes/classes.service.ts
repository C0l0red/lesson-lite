import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from './class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
  ) {}

  async createMany(createClassesDto: CreateClassDto[]) {
    return this.classModel.insertMany(createClassesDto);
  }

  async create(createClassDto: CreateClassDto) {
    return this.classModel.create(createClassDto);
  }
}
