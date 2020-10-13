import { Module } from '@nestjs/common';
import { PerformanceReviewsService } from './performance-reviews.service';
import { PerformanceReviewsController } from './performance-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceReviewsRepository } from './performance-reviews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceReviewsRepository])],
  providers: [PerformanceReviewsService],
  controllers: [PerformanceReviewsController],
  exports: [PerformanceReviewsService],
})
export class PerformanceReviewsModule {}
