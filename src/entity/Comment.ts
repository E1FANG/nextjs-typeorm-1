import {Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';
import {Post} from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id:number;
  @Column('varchar')
  content:string;
  @CreateDateColumn()
  createAt:Date;
  @CreateDateColumn()
  updatedAt:Date;
  //第一个参数：target 目标   所以对上的是User这个entity
  //第二个参数: inverseSide 相反的另一边 就是对面（User）  我们这边去对应对面user的comments
  @ManyToOne(type => User, user =>user.comments)
  user: User;
  @ManyToOne(type => Post,post=>post.comments)
  post:Post
}
