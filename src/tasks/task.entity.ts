/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "timestamp" })
  startDate: Date;

  @Column({ type: "timestamp" })
  dueDate: Date;

  @Column()
  taskType: string; // e.g., Dashboard, Mobile App

  
  @Column({ type: "enum", enum: ["Low", "Medium", "High"], default: "Medium" })
  priority: string;

  @Column({ type: "enum", enum: ["To-Do", "In Progress", "Completed"], default: "To-Do" })
  status: string;

  @Column({ type: "int", default: 0 })
  progress: number; // To track percentage completion

  @ManyToMany(() => User, (user) => user.tasks, { eager: true })
  @JoinTable()
  assignedUsers: User[];  // **Array to hold multiple assigned users**

    
  @ManyToOne(() => User, (user) => user.createdTasks)
    createdBy: User;
}
