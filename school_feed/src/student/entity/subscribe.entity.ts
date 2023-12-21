import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'SUBSCRIBE' })
export class SubscribeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'subscribe_index' })
  subscribeIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'student_index' })
  studentIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'page_index' })
  pageIndex: string;

  @Column({ type: 'integer', nullable: false })
  status: number;

  @UpdateDateColumn({ type: 'timestamptz', name: 'update_date' })
  updateDate: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}