import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'NEWS' })
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'news_index' })
  newsIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'page_index' })
  pageIndex: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @UpdateDateColumn({ type: 'timestamptz', name: 'update_date' })
  updateDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
