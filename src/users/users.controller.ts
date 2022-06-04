import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async saveUsers(@Body() req: CreateUserDto): Promise<any> {
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
