import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React, {PropsWithChildren} from 'react';
import {useHeader} from '../hooks/useHeader';
import {Row, Col, Card, List} from 'antd';
import {useCard} from '../hooks/useCard';
import {withSession} from '../lib/withSession';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import {useIcon} from '../hooks/useIcon';
import {Comment as entityComment} from '../src/entity/Comment';
import {useTags} from '../hooks/useTags';
import {tagListData} from '../next-env';
import _ from 'lodash';
import Link from 'next/link';

type Props = {
  TopPosts: Post[];
  posts: Post[];
  tagListData: tagListData
}

const Home: NextPage = (props: PropsWithChildren<Props>) => {
  const {TopPosts, posts, tagListData} = props;
  TopPosts.sort((a, b) => b.viewCount - a.viewCount);
  const {IconFont} = useIcon();
  const {PageHeader} = useHeader();
  const {tagList} = useTags({tagListData});
  return (
    <>
      {PageHeader}
      <Row >
        <Col lg={5} md={6} xs={0}>
          <Card>
            <div className="siderBar">
              <img src="/logo.png" alt=""/>
              <h1>Hasson的个人博客</h1>
              <p>好好学习，天天向上</p>
              <div>
                <a href="https://github.com/E1FANG" style={{color: 'black'}}>
                  <IconFont type="icon-github"/>
                  <span>GitHub</span>
                </a>
                <a href="https://www.yuque.com/u640022?tab=books" style={{color: 'black'}}>
                  <IconFont type="icon-tubiaozhizuomoban"/>
                  <span>语雀</span>
                </a>
              </div>
            </div>
          </Card>
          <Card title="标签">
            {tagList}
          </Card>
        </Col>
        <Col lg={15} md={18} xs={24}>
          {TopPosts.map((e) => {
            let {cards} = useCard(e);
            return (
              <div key={e.id}>
                {cards}
              </div>
            );
          })}
        </Col>
        <Col lg={4} md={0} xs={0}>
          <Card title="热门文章">
            <ul className="hot-list">
              {posts.map((item) =>
                <li key={item.id}>
                  <Link href={`/posts/${item.id}`}><a>
                    {item.title}
                  </a>
                  </Link>
                </li>
              )}
            </ul>
          </Card>
        </Col>
      </Row>
      <style jsx>{`
        .siderBar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .siderBar img {
          width: 300px;
          height: 300px;
        }

        .hot-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .hot-list li{
          margin-bottom: 8px;
        }
        .hot-list a {
          color: #8590a6;
          cursor: pointer;
          font-size: 15px;
          word-break: break-all;
          white-space: pre-line;
        }
      `}</style>
    </>
  );
};

export default Home;

// 后端
export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const postRepository = connection.getRepository(Post);

    const posts = await postRepository.createQueryBuilder('post').getMany();

    const TopPosts = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .orderBy('post.viewCount', 'DESC')
      .take(5)
      .getMany();

    let tagListData: tagListData = [];
    posts.forEach((e, i) => {
      let tags = e.tags.split(',');
      tags.forEach((x, y) => {
        tagListData.push(x);
      });
    });
    tagListData = _.uniq(tagListData);
    return {
      props: {
        TopPosts: JSON.parse(JSON.stringify(TopPosts)),
        posts: JSON.parse(JSON.stringify(posts)),
        tagListData
      }
    };
  });
