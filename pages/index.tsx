import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import React, {useEffect, useState} from 'react';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
// import {User} from '../src/entity/User';

type Props = {
  posts: Post[]
}
// 前端
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      c12345
      {posts.map(post =>
        <div key={post.id}>{post.title}</div>
      )}
    </div>
  );
};
export default index;


// 后端
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
