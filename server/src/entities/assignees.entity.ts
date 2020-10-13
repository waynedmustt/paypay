import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PerformanceReviews } from './performance-reviews.entity';
import { Users } from './users.entity';

@Entity()
export class Assignees {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  feedback: string;

  @Column({ type: 'boolean' })
  isSubmitted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    type => Users,
    user => user.assignee,
  )
  user: Users;

  @ManyToOne(
    type => PerformanceReviews,
    performanceReviews => performanceReviews.assignee,
  )
  performanceReview: PerformanceReviews;
}
