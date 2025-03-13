/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['assignedUsers'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['assignedUsers'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(data: CreateTaskDto, creatorId: number): Promise<Task> {
    const creator = await this.userRepository.findOne({ where: { id: creatorId } });
    if (!creator) {
      throw new Error('Creator user not found');
    }

    const assignedUsers = await this.userRepository.findBy({ id: In(data.assignedUserIds) });
    if (assignedUsers.length !== data.assignedUserIds.length) {
      throw new Error('One or more assigned users not found');
    }

    const task = this.tasksRepository.create({
      ...data,
      status: 'To-Do', // Default status
      progress: 0, // Default progress
      assignedUsers,
      createdBy: creator,
    });

    return this.tasksRepository.save(task);
  }

  async update(id: number, updates: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({ id, ...updates });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.tasksRepository.save(task);
  }

  async updateTaskProgress(id: number, progress: number) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.progress = progress;
    return this.tasksRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async findFiltered(status?: string, priority?: string, userId?: number, query?: string): Promise<Task[]> {
    const qb = this.tasksRepository.createQueryBuilder('task');
    qb.leftJoinAndSelect('task.assignedUsers', 'user');

    if (status) qb.andWhere('task.status = :status', { status });
    if (priority) qb.andWhere('task.priority = :priority', { priority });
    if (userId) qb.andWhere('user.id = :userId', { userId });
    if (query) qb.andWhere('(task.name LIKE :query OR task.description LIKE :query)', { query: `%${query}%` });

    return qb.getMany();
  }

  async inviteUserToTask(taskId: number, userId: number) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['assignedUsers'] });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!task || !user) throw new Error('Task or User not found');

    task.assignedUsers.push(user);
    return this.tasksRepository.save(task);
  }

  async removeUserFromTask(taskId: number, userId: number) {
    const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['assignedUsers'] });
    if (!task) throw new NotFoundException(`Task with ID ${taskId} not found`);

    task.assignedUsers = task.assignedUsers.filter(user => user.id !== userId);
    return this.tasksRepository.save(task);
  }

  async assignUsersToTask(taskId: number, userIds: number[]): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId }, relations: ['assignedPeople'] });
    if (!task) throw new NotFoundException('Task not found');
  
    const users = await this.userRepository.findByIds(userIds);
    task.assignedUsers = [...task.assignedUsers, ...users];
  
    return this.tasksRepository.save(task);
  }
  
}
