import { Messages } from 'src/messages/messages.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'mydb' })
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Messages, (messages) => messages.room)
  messages: Messages[];
}
