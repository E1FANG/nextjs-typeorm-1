import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {withSession} from '../../lib/withSession';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring'
import {usePager} from '../../hooks/usePager';
import {User} from '../../src/entity/User';
import {useGoback} from '../../hooks/useGoback';
import {useHeader} from '../../hooks/useHeader';
import {Tag} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';

type Props = {
  currentUser:User | null;
  posts: Post[];
  count:number;
  perPage:number;
  page:number;
  totalPage:number;
}
// 前端
const PostsIndex: NextPage<Props> = (props) => {
  const {PageHeader} = useHeader()
  const {currentUser,posts,page,totalPage} = props;
  const {back} = useGoback('/')
  const {pager} = usePager({page,totalPage})
  return (
    <>
      {PageHeader}
      <div className="posts">
        <header>
          <h1>{back}文章列表</h1>
          {currentUser && <Link href="/posts/new"><a>新增文章</a></Link>}
        </header>
        {posts.map(post =>
          <div className="onePost" key={post.id} >
            <Link href={`/posts/${post.id}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </div>
        )}
        <footer>
          {pager}
        </footer>
      </div>
      <style jsx>{`
      .posts{
        max-width: 800px;
        margin: 0 auto;
        padding: 16px; 
      } 
      .posts >header{
        display:flex;
        align-items: center;
      }
      .posts >header > h1{
         margin: 0; 
         margin-right: auto;
      }
      .onePost{
        border-bottom: 1px solid #ddd;
        padding: 8px 0;
      }
      .onePost > a{
        border-bottom: none;
        color: #000;
      }
      .onePost > a:hover{
        color: #00adb5; 
      }
      `}</style>
    </>
  );
};
export default PostsIndex;


// 后端
export const getServerSideProps: GetServerSideProps = withSession(
  async (context:GetServerSidePropsContext) => {
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index+1)
  const query = qs.parse(search)
  const page = parseInt(query.page?.toString()) || 1
  const currentUser = (context.req as any).session.get('currentUser') || null;
  const perPage = 10
  const connection = await getDatabaseConnection();
  const [posts,count] = await connection.manager.findAndCount(Post,
    {skip:(page-1)*perPage,take:perPage});
  return {
    props: {
      currentUser,
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPage,
      page,
      totalPage:Math.ceil( count/perPage)
    }
  };
});
