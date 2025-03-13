/* eslint-disable prettier/prettier */
import { IsArray, IsInt } from 'class-validator';

export class AssignTaskDto {
  @IsInt()
  taskId: number;

  @IsArray()
  userIds: number[]; // List of user IDs to assign
}
