import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignees } from './assignees.entity';
import { PerformanceReviews } from './performance-reviews.entity';
import { Roles } from './roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 255 })
  firstName: string;

  @Column('varchar', { length: 255 })
  lastName: string;

  @Column('varchar', { length: 255 })
  username: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(
    type => Roles,
    role => role.user,
    { cascade: ['update'] },
  )
  @JoinColumn()
  role: Roles;

  @OneToMany(
    type => PerformanceReviews,
    performanceReviews => performanceReviews.user,
    { cascade: ['remove'] },
  )
  performanceReview: PerformanceReviews[];

  @OneToMany(
    type => Assignees,
    assignees => assignees.user,
    { cascade: ['remove'] },
  )
  assignee: Assignees[];
}
