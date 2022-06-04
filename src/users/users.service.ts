import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  create(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.password = body.password;
    user.email = body.email;

    try {
      return this.usersRepository.save(user);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}