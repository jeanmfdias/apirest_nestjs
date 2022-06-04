import { Controller, Post, Body, Get } from '@nestjs/common';
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
  async create(@Body() req: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.create(req);
      return user;
    } catch (err) {
      return {
        statusCode: 400,
        message: "create user error",
        details: err
      };
    }
  }
}
