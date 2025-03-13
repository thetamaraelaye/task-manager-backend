/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Body('creatorId', ParseIntPipe) creatorId: number): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, creatorId);
  }

//    @Post()
//   async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
//     return this.tasksService.createTask(createTaskDto);
//   }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Put(':id/assign')
async assignUsers(@Param('id', ParseIntPipe) id: number, @Body() body: { userIds: number[] }) {
  return this.tasksService.assignUsersToTask(id, body.userIds);
}


  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
