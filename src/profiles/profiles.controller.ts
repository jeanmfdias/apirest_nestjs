import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create_profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  index() {
    return this.profilesService.findAll();
  }

  @Post()
  create(@Body() req: CreateProfileDto) {
    return this.profilesService.firstOrCreate(req);
  }
}
