import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'NEWS_FEED' })
export class NewsFeedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'feed_index' })
  feedIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'news_index' })
  newsIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'page_index' })
  pageIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'student_index' })
  studentIndex: string;

  @Column({ type: 'timestamptz', nullable: false, name: 'news_create_date' })
  newsCreateDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
