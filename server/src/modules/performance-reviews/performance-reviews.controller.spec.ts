import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PerformanceReviews } from '../../entities/performance-reviews.entity';
import { Repository } from 'typeorm';
import { PerformanceReviewsController } from './performance-reviews.controller';
import { createMock } from '@golevelup/nestjs-testing';
import { PerformanceReviewsService } from './performance-reviews.service';

describe('PerformanceReviewsController', () => {
  let controller: PerformanceReviewsController;
  let repo: Repository<PerformanceReviews>;
  let service: PerformanceReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceReviewsController],
      providers: [
        {
          provide: PerformanceReviewsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {
                firstName: 'dimas',
                lastName: 'dewantara',
                username: 'ddewantara',
              },
              {
                firstName: 'rich',
                lastName: 'brian',
                username: 'brian',
              },
            ]),
            get: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'dimas',
                lastName: 'dewantara',
                username: 'ddewantara',
                id: id,
              }),
            ),
          },
        },
        {
          provide: getRepositoryToken(PerformanceReviews),
          useValue: createMock<Repository<PerformanceReviews>>(),
        },
      ],
    }).compile();

    service = module.get<PerformanceReviewsService>(PerformanceReviewsService);
    controller = module.get<PerformanceReviewsController>(
      PerformanceReviewsController,
    );
    repo = module.get<Repository<PerformanceReviews>>(
      getRepositoryToken(PerformanceReviews),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return all users', async () => {
      expect(controller.findAll({})).resolves.toEqual([
        {
          firstName: 'dimas',
          lastName: 'dewantara',
          username: 'ddewantara',
        },
        {
          firstName: 'rich',
          lastName: 'brian',
          username: 'brian',
        },
      ]);
    });

    it('should return users by id', async () => {
      expect(controller.findOne('1')).resolves.toEqual({
        id: '1',
        firstName: 'dimas',
        lastName: 'dewantara',
        username: 'ddewantara',
      });
    });
  });
});
