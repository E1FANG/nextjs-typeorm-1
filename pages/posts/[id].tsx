import React, {useCallback} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';
import marked from 'marked';
import Link from 'next/link';
import {withSession} from '../../lib/withSession';
import axios from 'axios';
import {useRouter} from 'next/router';
import {User} from '../../src/entity/User';
import {useGoback} from '../../hooks/useGoback';
import {Tag,Divider } from 'antd';
import {EditOutlined} from '@ant-design/icons';

type Props = {
  id: number;
  post: Post;
  currentUser: User | null;
}
const postsShow: NextPage<Props> = (props) => {
  console.log(props);
  const {post, currentUser, id} = props;
  const tags = post.tags.split(',')
  console.log(props.post);
  console.log(currentUser);
  const {back} = useGoback('/posts')
  const router = useRouter()
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(() => {
      window.alert('删除成功');
      router.push('/posts')
    }, () => {
      window.alert('删除失败');
    });
  }, [id]);
  return (
    <>
      <div className="wrapper">
        <header>
          <h1> {back}{post.title}</h1>
          <div>
            <Tag icon={<EditOutlined />} color="#55acee">
              作者：{post.author.username}
            </Tag>
            {tags.map(element =>
              <Tag   color="red">
                <span> {element}</span>
              </Tag>)}
          </div>
          <Divider />
          {currentUser && currentUser.id===post.author.id &&
          <p className="actions">
            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
            <button onClick={onRemove}>删除</button>
          </p>
          }
        </header>
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
      </div>
      <style jsx>{`
      .actions > *{
        margin: 4px; 
      }
      .actions > *:first-child{
        margin-left: 0; 
      }
      .wrapper{
        max-width: 800px;
        margin: 16px auto;
        padding: 0 16px;
      }
      h1{margin: 0}
      `}</style>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const id = context.params.id;
    // const post = await connection.manager.findOne('Post', id);
    const currentUser = (context.req as any).session.get('currentUser') || null;
    const post = await connection
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .where('post.id = :id', {id})
      .getOne();
    return {
      props: {
        id: parseInt(id.toString()),
        post: JSON.parse(JSON.stringify(post)),
        currentUser
      }
    };
  });
