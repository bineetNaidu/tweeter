import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Tweet } from './Tweet';
import { User } from './User';

@Entity()
@ObjectType()
export class Bookmark extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user!: User;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.id, { onDelete: 'CASCADE' })
  tweet!: Tweet;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
