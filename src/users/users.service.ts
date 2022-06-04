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
      let profileCreated = await this.profilesService.create({ name: profile });    
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
}