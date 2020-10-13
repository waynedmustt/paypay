import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let userRepo: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue([
              {
                username: 'dimas',
                firstName: 'dimas',
                lastName: 'dewantara',
              },
              {
                username: 'rich',
                firstName: 'brian',
                lastName: 'brian',
              },
            ]),
            getAllAdminUsers: jest.fn().mockResolvedValue([
              {
                username: 'admin',
                firstName: 'admin',
                lastName: 'admin',
              },
            ]),
            get: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                username: 'dimas',
                firstName: 'dimas',
                lastName: 'dewantara',
                id: id,
              }),
            ),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: createMock<Repository<Users>>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
    userRepo = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return all users', async () => {
      expect(controller.findAllUsers({})).resolves.toEqual([
        {
          username: 'dimas',
          firstName: 'dimas',
          lastName: 'dewantara',
        },
        {
          username: 'rich',
          firstName: 'brian',
          lastName: 'brian',
        },
      ]);
    });

    it('should return all admin users', async () => {
      expect(controller.findAllAdminUsers({})).resolves.toEqual([
        {
          username: 'admin',
          firstName: 'admin',
          lastName: 'admin',
        },
      ]);
    });

    it('should return users by id', async () => {
      expect(controller.findOne('1')).resolves.toEqual({
        username: 'dimas',
        firstName: 'dimas',
        lastName: 'dewantara',
        id: '1',
      });
    });
  });
});
