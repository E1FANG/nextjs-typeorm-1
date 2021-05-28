import {
  Column,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Post} from './Post';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  tagName: string;
  @ManyToMany(
    () => Post,
    post => post.tagName
  )
  posts: Post[]
}
