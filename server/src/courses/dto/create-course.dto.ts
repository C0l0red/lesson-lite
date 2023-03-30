import { CreateClassDto } from '../../classes/dto/create-class.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [CreateClassDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClassDto)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  classes: CreateClassDto[];
}
