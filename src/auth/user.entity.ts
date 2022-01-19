import { Board1 } from 'src/board/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
