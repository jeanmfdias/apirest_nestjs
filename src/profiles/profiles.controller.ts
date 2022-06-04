import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  index() {
    return this.profilesService.findAll();
  }
}
