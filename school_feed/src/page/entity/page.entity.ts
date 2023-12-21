import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'PAGE' })
export class PageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'page_index' })
  pageIndex: string;

  @Column({ type: 'text', nullable: false, name: 'page_name' })
  pageName: string;

  @Column({ type: 'text', nullable: false, name: 'school_name' })
  schoolName: string;

  @Column({ type: 'text', name: 'short_description' })
  shortDescription: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
