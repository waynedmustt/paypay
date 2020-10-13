import { Test, TestingModule } from '@nestjs/testing';
import { Assignees } from '../../entities/assignees.entity';
import { Repository } from 'typeorm';
import { AssigneesController } from './assignees.controller';
import { AssigneesService } from './assignees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from '@golevelup/nestjs-testing';

describe('AssigneesController', () => {
  let controller: AssigneesController;
  let repo: Repository<Assignees>;
  let service: AssigneesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssigneesController],
      providers: [
        AssigneesService,
        {
          provide: getRepositoryToken(Assignees),
          useValue: createMock<Repository<Assignees>>(),
        },
      ],
    }).compile();

    service = module.get<AssigneesService>(AssigneesService);
    controller = module.get<AssigneesController>(AssigneesController);
    repo = module.get<Repository<Assignees>>(getRepositoryToken(Assignees));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
