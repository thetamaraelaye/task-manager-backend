/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsEnum, IsArray, IsInt, Min, Max } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['Dashboard', 'Mobile App'])
  taskType?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  assignedUserIds?: number[];

  @IsOptional()
  @IsEnum(['Low', 'Medium', 'High'])
  priority?: string;

  @IsOptional()
  @IsEnum(['To-Do', 'In Progress', 'Completed'])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number;
}
