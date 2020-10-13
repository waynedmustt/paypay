import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { AuthService } from './modules/auth/auth.service';
import { UsersService } from './modules/users/users.service';
import { createMock } from '@golevelup/nestjs-testing';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;
  let usersService: UsersService;
  let userRepo: Repository<Users>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: {
            validateUsers: jest.fn().mockResolvedValue(of({})),
            login: jest.fn().mockResolvedValue(
              of({
                user: {
                  username: 'dimas',
                },
                accessToken: '123456',
              }),
            ),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue(of({})),
            getAllAdminUsers: jest.fn().mockResolvedValue(of({})),
            get: jest.fn().mockResolvedValue(
              of({
                username: 'dimas',
                firstName: 'dimas',
                lastName: 'dewantara',
              }),
            ),
            getUsers: jest.fn().mockResolvedValue(of({})),
            create: jest.fn().mockResolvedValue(of({})),
            update: jest.fn().mockResolvedValue(of({})),
            updatePassword: jest.fn().mockResolvedValue(of({})),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: createMock<Repository<Users>>(),
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
    usersService = app.get<UsersService>(UsersService);
    userRepo = app.get<Repository<Users>>(getRepositoryToken(Users));
  });

  describe('root', () => {
    it('should return user and access token', async () => {
      const result = of({
        user: {
          username: 'dimas',
        },
        accessToken: '123456',
      });
      jest.spyOn(authService, 'login').mockImplementation(() => result);

      expect(await appController.login({})).toBe(result);
    });

    it('should return user detail', async () => {
      const result = of({
        username: 'dimas',
        firstName: 'dimas',
        lastName: 'dewantara',
      });
      jest.spyOn(usersService, 'get').mockImplementation(() => result);

      expect(await appController.getMe({})).toBe(result);
    });
  });
});
