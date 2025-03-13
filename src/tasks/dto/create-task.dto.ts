/* eslint-disable prettier/prettier */
import {
  IsString,
  IsDate,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  dueDate: Date;

  @IsString()
  taskType: string;

  @IsEnum(["Low", "Medium", "High"])
  priority: string;

  @IsEnum(["To-Do", "In Progress", "Completed"])
  status: string;

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;

  @IsArray()
  assignedUserIds: number[]; // List of user IDs
}
