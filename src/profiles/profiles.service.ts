import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create_profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) 
    private profilesRepository: Repository<Profile>
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({
      order: {
        name: 'asc'
      }
    });
  }

  findOneBy(name: string): Promise<Profile> {
    return this.profilesRepository.findOneBy({ name });
  }

  create(body: CreateProfileDto): Promise<Profile> {
    const profile: Profile = new Profile();

    profile.name = body.name;

    return this.profilesRepository.save(profile);
  }

  async firstOrCreate(body: CreateProfileDto): Promise<Profile> {
    const profile = await this.findOneBy(body.name);
    
    if (!profile) {
      return this.create(body);
    }

    return profile;
  }
}
