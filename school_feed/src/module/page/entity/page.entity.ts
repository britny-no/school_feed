import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';

import { SubscribeEntity } from '@App/module/student/entity/subscribe.entity';
@Entity({ name: 'PAGE' })
export class PageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'page_index' })
  pageIndex: string;

  @Column({ type: 'bigint', nullable: false, name: 'admin_index' })
  adminIndex: string;

  @Column({ type: 'text', nullable: false, unique: true, name: 'page_name' })
  pageName: string;

  @Column({ type: 'text', nullable: false, unique: true, name: 'school_name' })
  schoolName: string;

  @Column({ type: 'text', nullable: false, name: 'short_description' })
  shortDescription: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;

  // @OneToMany((type) => SubscribeEntity, (subscribe) => subscribe.pages)
  // subscribes!: SubscribeEntity[];
}
