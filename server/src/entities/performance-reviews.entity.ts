import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignees } from './assignees.entity';
import { Users } from './users.entity';

@Entity()
export class PerformanceReviews {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column({ type: 'timestamp' })
  year: Date;

  @Column({ type: 'boolean' })
  isCompleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    type => Users,
    user => user.performanceReview,
  )
  user: Users;

  @OneToMany(
    type => Assignees,
    assignees => assignees.performanceReview,
    { cascade: ['remove'] },
  )
  assignee: Assignees[];
}
