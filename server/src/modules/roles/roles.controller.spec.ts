import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from '../../entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;
  let repo: Repository<Roles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                name: 'personal',
                type: 'personal',
              },
              {
                name: 'business',
                type: 'business',
              },
            ]),
          },
        },
        {
          provide: getRepositoryToken(Roles),
          useValue: createMock<Repository<Roles>>(),
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
    repo = module.get<Repository<Roles>>(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return all roles', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'personal',
          type: 'personal',
        },
        {
          name: 'business',
          type: 'business',
        },
      ]);
    });
  });
});
