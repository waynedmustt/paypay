import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Assignees } from '../../entities/assignees.entity';
import { AssigneesRepository } from './assignees.repository';

@Injectable()
export class AssigneesService {
  constructor(private readonly assigneesRepository: AssigneesRepository) {}

  create(params: Assignees): Observable<any> {
    return from(this.assigneesRepository.save(params)).pipe(
      mergeMap(response => {
        if (!response) {
          return of({
            success: false,
            message: 'error occurred when retrieved data',
          });
        }

        return of({
          success: true,
          message: `assignee successfully created!`,
        });
      }),
    );
  }

  submitFeedback(id: string, body: any) {
    return from(this.assigneesRepository.update(id, body)).pipe(
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
          message: `feedback successfully submitted`,
        });
      }),
    );
  }
}
