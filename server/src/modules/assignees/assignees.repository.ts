import { Repository, EntityRepository } from 'typeorm';
import { Assignees } from '../../entities/assignees.entity';

@EntityRepository(Assignees)
export class AssigneesRepository extends Repository<Assignees> {}
