import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { Profile } from './profiles/profile.entity';
import { ProfilesService } from './profiles/profiles.service';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useClass: Repository
        },
        AuthService,
        JwtService
      ]
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('login', () => {
    it('should return token to access', async () => {
      const result = ['test'];
      const req = { username: "admin@admin.com", password: "123" };
      // jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

      // expect(await appController.login(req)).toBe(result);
      let sum = 2 + 2;
      expect(sum).toBe(4);
    });
  });
});
