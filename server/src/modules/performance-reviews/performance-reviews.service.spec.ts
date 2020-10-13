import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceReviews } from '../../entities/performance-reviews.entity';
import { PerformanceReviewsService } from './performance-reviews.service';

describe('PerformanceReviewsService', () => {
  let service: PerformanceReviewsService;
  let repo: Repository<PerformanceReviews>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformanceReviewsService,
        {
          provide: getRepositoryToken(PerformanceReviews),
          useValue: createMock<Repository<PerformanceReviews>>(),
        },
      ],
    }).compile();

    service = module.get<PerformanceReviewsService>(PerformanceReviewsService);
    repo = module.get<Repository<PerformanceReviews>>(
      getRepositoryToken(PerformanceReviews),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
});
