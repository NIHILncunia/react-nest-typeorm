import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TaskStatus = ('Created' | 'InProgress' | 'Done');

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 64, })
  title: string;

  @Column({ nullable: true, length: 1024, })
  description: string;

  @Column({ nullable: false, default: 'Created', })
  status: TaskStatus;
}
