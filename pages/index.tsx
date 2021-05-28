import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import Link from 'next/link';
import React, {PropsWithChildren} from 'react';
import {useHeader} from '../hooks/useHeader';
import {Row, Col, Card} from 'antd';
import {useCard} from '../hooks/useCard';
import {withSession} from '../lib/withSession';
import qs from 'querystring';
import {getDatabaseConnection} from '../lib/getDatabaseConnection';
import {Post} from '../src/entity/Post';
import {User} from '../src/entity/User';
import {useIcon} from '../hooks/useIcon';
import axios from 'axios';

type Props = {
  posts: Post[];
}

const Home: NextPage = (props: PropsWithChildren<Props>) => {
  const {posts} = props;
  posts.sort((a, b) => b.viewCount - a.viewCount);
  const {IconFont} = useIcon()
  const {PageHeader} = useHeader();
  return (
    <>
      {PageHeader}
      <Row>
        <Col lg={4} md={6} xs={0}>
          <Card>
          <div className="siderBar">
            <img src="/logo.png" alt=""/>
            <h1>Hasson的个人博客</h1>
            <p>好好学习，天天向上</p>
            <div >
              <a href="https://github.com/E1FANG" style={{color:"black"}}>
                <IconFont type="icon-github"/>
              <span>GitHub</span>
              </a>
              <a href="https://www.yuque.com/u640022?tab=books" style={{color:"black"}}>
                <IconFont type="icon-tubiaozhizuomoban"/>
                <span>语雀</span>
              </a>
            </div>
            {/*<p><Link href="/posts"><a>文章列表</a></Link></p>*/}
          </div>
          </Card>
        </Col>
        <Col lg={17} md={18} xs={24}>
          {posts.map((e) => {
            let {cards} = useCard(e);
            return cards;
          })}
        </Col>
        <Col lg={3} md={0} xs={0}>
        </Col>
      </Row>
      <style jsx>{`
        .siderBar{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        }
        .siderBar img {
          width: 300px;
          height: 300px;
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
    const [posts, count] = await connection.manager.findAndCount(Post,
      {skip: 0, take: 5});
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      }
    };
  });
