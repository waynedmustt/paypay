import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '../../entities/roles.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/nestjs-testing';

describe('RolesService', () => {
  let service: RolesService;
  let repo: Repository<Roles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Roles),
          useValue: createMock<Repository<Roles>>(),
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repo = module.get<Repository<Roles>>(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
});
