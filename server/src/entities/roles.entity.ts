import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  type: string;

  @OneToOne(
    type => Users,
    user => user.role,
    { cascade: ['remove'] },
  )
  user: Users;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
