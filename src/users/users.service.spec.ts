import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from 'src/profiles/profile.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('Repository functions', () => {
    it('findAll', async () => {
      const user: User = new User();
      const result: Array<User> = [ user ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    });
  
    it('findOne', async () => {
      const user: User = new User();
      jest.spyOn(service, 'findOne').mockImplementation(async (id: string) => user);

      expect(await service.findOne("1")).toBe(user);
    });
  
    it('findByEmail', async () => {
      const user: User = new User();
      jest.spyOn(service, 'findOne').mockImplementation(async (email: string) => user);

      expect(await service.findOne("test@test.com")).toBe(user);
    });
  
    it('create', async () => {
      const userDto: CreateUserDto = {
        name: "Test",
        email: "test@test.com",
        password: "123",
        profiles: []
      };
      const user: User = new User;
      user.name = "Test";

      jest.spyOn(usersRepository, 'save').mockImplementation(async () => user);

      expect(await service.create(userDto)).toBe(user);
    });
  });

  it('should result email error on treatErrorCreate', async () => {
    const err = {
      code: "23505"
    };
    const result = {
      "message": "the email already exists",
      "statusCode": 400
    };

    expect(await service.treatErrorCreate(err)).toEqual(result);
  });

  it('not should result email error on treatErrorCreate', async () => {
    const err = {
      code: "00000"
    };
    const result = {
      "message": "the email already exists",
      "statusCode": 400
    };

    expect(await service.treatErrorCreate(err)).not.toEqual(result);
  });

  it('treatResultCreate', async () => {
    const result = { token: 1234 };
    const user: User = new User;

    jest.spyOn(service, 'treatResultCreate').mockImplementation(async () => result);

    expect(await service.treatResultCreate(user)).toBe(result);
  });

  it('updateLastLogin', async () => {
      const user: User = new User;

      jest.spyOn(service, 'updateLastLogin').mockImplementation(async () => user);

      expect(await service.updateLastLogin(user)).toBe(user);
  });

});
