import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
    private profilesService: ProfilesService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        profiles: true
      }
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    let profiles: Array<Profile> = [];

    for (const profile of body.profiles) {
      let profileCreated = await this.profilesService.firstOrCreate({ name: profile });
      profiles.push(profileCreated);
    } 

    user.name = body.name;
    user.password = body.password;
    user.email = body.email;
    user.profiles = profiles;

    try {
      return this.usersRepository.save(user);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  treatErrorCreate(err: any): any {
    let result = {
      statusCode: 400,
      message: "create user error"
    };
    let newResult;
    
    switch (err.code) {
      case "23505":
        let message = "the email already exists"
        result.message = message;
        newResult = result;
        break;
      default:
        newResult = {
          statusCode: result.statusCode,
          message: result.message,
          details: err
        }
    }

    return newResult;
  }

  async treatResultCreate(user: User): Promise<any> {
    const token = null;
    let result = {
      id: user.id,
      name: user.name,
      email: user.email,
      created: user.createdAt,
      modified: user.updatedAt,
      last_login: user.lastLogin,
      profiles: user.profiles,
      token: token
    };

    return result;
  }
}