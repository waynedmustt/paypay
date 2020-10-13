import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PerformanceReviews } from 'src/entities/performance-reviews.entity';
import { PerformanceReviewsRepository } from './performance-reviews.repository';

@Injectable()
export class PerformanceReviewsService {
  constructor(
    private readonly performanceReviewsRepository: PerformanceReviewsRepository,
  ) {}

  getAll(query: any) {
    return from(this.performanceReviewsRepository.findByQuery(query));
  }

  get(id: string, query?): Observable<any> {
    return from(
      this.performanceReviewsRepository.findOne(id, {
        relations: ['user', 'assignee', 'assignee.user'],
      }),
    ).pipe(
      mergeMap(response => {
        return of(response);
      }),
    );
  }

  create(params: PerformanceReviews): Observable<any> {
    return from(this.performanceReviewsRepository.save(params)).pipe(
      mergeMap(response => {
        if (!response) {
          return of({
            success: false,
            message: 'error occurred when retrieved data',
          });
        }

        return of({
          success: true,
          message: `performance review successfully created!`,
        });
      }),
    );
  }

  update(id: string, body: any) {
    return from(this.performanceReviewsRepository.update(id, body)).pipe(
      mergeMap(response => {
        if (
          !response ||
          !response.raw ||
          response.raw.affectedRows === 0 ||
          response.raw.changedRows === 0
        ) {
          return of({
            success: false,
            message: 'error occurred when updated the data',
          });
        }

        return of({
          success: true,
          message: `performance review with ID ${id} successfully updated!`,
        });
      }),
    );
  }
}
