import { Repository, EntityRepository } from 'typeorm';
import { GlobalUtility } from '../../utilities/global.utility';
import { PerformanceReviews } from '../../entities/performance-reviews.entity';

@EntityRepository(PerformanceReviews)
export class PerformanceReviewsRepository extends Repository<
  PerformanceReviews
> {
  private _getConfig() {
    return GlobalUtility.getInstance();
  }

  findByQuery(query: any) {
    if (this._getConfig().isEmptyObject(query)) {
      return this.find({
        relations: ['user', 'assignee', 'assignee.user'],
      });
    }

    const addedQuery = {
      where: query,
      relations: ['user', 'assignee', 'assignee.user'],
    };
    return this.find(addedQuery);
  }
}
