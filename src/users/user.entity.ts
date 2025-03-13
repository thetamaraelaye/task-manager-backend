/* eslint-disable prettier/prettier */
 
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // Avatar is optional
  avatar?: string;

  @ManyToMany(() => Task, (task) => task.assignedUsers)
  @JoinTable()
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];
}
