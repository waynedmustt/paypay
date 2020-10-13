import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignees } from '../../entities/assignees.entity';
import { Repository } from 'typeorm';
import { AssigneesService } from './assignees.service';

describe('AssigneesService', () => {
  let service: AssigneesService;
  let repo: Repository<Assignees>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssigneesService,
        {
          provide: getRepositoryToken(Assignees),
          useValue: createMock<Repository<Assignees>>(),
        },
      ],
    }).compile();

    service = module.get<AssigneesService>(AssigneesService);
    repo = module.get<Repository<Assignees>>(getRepositoryToken(Assignees));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
});
