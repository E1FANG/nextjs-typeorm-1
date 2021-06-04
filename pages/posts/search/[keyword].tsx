import React, {useCallback, useState} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {Post} from '../../../src/entity/Post';
import {Comment as entityComment} from '../../../src/entity/Comment';
import {withSession} from '../../../lib/withSession';
import {User} from '../../../src/entity/User';
import {useHeader} from '../../../hooks/useHeader';
import {Empty, Timeline} from 'antd';
import {useCard} from '../../../hooks/useCard';

type Props = {
  keyword: string;
  postResult:Post[];
  post: Post;
  currentUser: User | null;
  comments: entityComment[]
}
const TitleSearch: NextPage<Props> = (props) => {
  const {keyword,postResult} = props;
  const {PageHeader} = useHeader();
  return (
    <>
      {PageHeader}
      <div className="wrapper">
        {postResult.length>0 ?
          <div>
            <h3>`{keyword}`已搜索到{postResult.length}条结果:</h3>
            {
              postResult.map((item) => {
                const {cards} = useCard(item)
                return cards
              })
            }
          </div> :
          <div className='no-result'>
            <Empty />
          </div>
        }
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 1200px;
          margin: 16px auto;
          padding: 50px 16px;
          padding-bottom: 100px;
        }
        .tag-title{
        font-size: 36px !important;
        font-weight: bolder;
        }
        .post-time{
        color: black;
        padding-right: 36px;
        }
        .no-result{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 600px;
        }
      `}</style>
    </>
  );
};

export default TitleSearch;

export const getServerSideProps: GetServerSideProps<any, { keyword: string }> = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const postRepository = connection.getRepository(Post);
    const keyword = context.params.keyword;
    const currentUser = (context.req as any).session.get('currentUser') || null;
    const postResult = await postRepository
      .createQueryBuilder('post')
      .where('post.title like :title', {title: `%${!!keyword ? keyword : ''}%`})
      .leftJoinAndSelect('post.comments', 'comment')
      .orderBy('post.viewCount', 'DESC')
      .getMany();
    return {
      props: {
        keyword: keyword,
        postResult:JSON.parse(JSON.stringify(postResult))
      }
    };
  });
