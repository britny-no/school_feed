import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'ADMIN' })
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'admin_index' })
  adminIndex: string;

  @Column({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  pw: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
