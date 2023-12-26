import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'STUDENT' })
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'student_index' })
  studentIndex: string;

  @Column({ type: 'text', nullable: false })
  id: string;

  @Column({ type: 'text', nullable: false })
  pw: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'create_date' })
  createDate: Date;
}
