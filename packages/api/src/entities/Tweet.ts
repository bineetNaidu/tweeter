import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from './Comment';
import { Like } from './Like';
import { User } from './User';

@Entity()
@ObjectType()
export class Tweet extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  body!: string;

  @Field()
  @ManyToOne(() => User, (user) => user.tweets, { onDelete: 'CASCADE' })
  author!: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  media: string;

  @Field()
  @Column({ default: false })
  has_media!: boolean;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.user, { onDelete: 'CASCADE' })
  likes: Like[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @Field(() => Boolean, { nullable: true })
  likeStatus: boolean | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
