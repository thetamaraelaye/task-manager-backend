/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from '../tasks/task.entity'; // Import your entity
import { User } from 'src/users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'mydb',
  entities: [Task, User], // Add all your entities here
  migrations: ['src/migrations/*.ts'], // Path to migrations folder
  synchronize: false, // Set to false in production
  logging: true,
});
