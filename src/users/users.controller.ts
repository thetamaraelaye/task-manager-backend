/* eslint-disable prettier/prettier */

import { Controller, Post, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() { email, password, avatar }: { email: string; password: string; avatar?: string }) {
    return this.usersService.create(email, password, avatar);
  }

  @Patch(':id/avatar')
  async updateAvatar(
    @Param('id', ParseIntPipe) userId: number,
    @Body('avatar') avatarUrl: string,
  ) {
    return this.usersService.updateAvatar(userId, avatarUrl);
  }
}
