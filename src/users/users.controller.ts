import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async index() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post()
  async create(
    @Res({ passthrough: true }) res: Response,
    @Body() req: CreateUserDto
  ): Promise<any> {
    try {
      const user = await this.usersService.create(req);
      return this.usersService.traitResultCreate(user);
    } catch (err) {
      const result = await this.usersService.traitErrorCreate(err);

      res.status(HttpStatus.BAD_REQUEST);
      return result;
    }
  }
}
