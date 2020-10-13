import { Repository, EntityRepository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { GlobalUtility } from '../../utilities/global.utility';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  private _getConfig() {
    return GlobalUtility.getInstance();
  }

  findByQuery(query: any) {
    if (this._getConfig().isEmptyObject(query)) {
      return this.find({
        relations: ['role'],
      });
    }

    const addedQuery = {
      where: query,
      relations: ['role'],
    };
    return this.find(addedQuery);
  }
}
