import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'ADMIN' })
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'admin_index' })
  adminIndex: string;

  @Column({ type: 'text', nullable: false })
  id: string;

  @Column({ type: 'text', nullable: false })
  pw: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
