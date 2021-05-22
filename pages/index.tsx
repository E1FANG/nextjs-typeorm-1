import {NextPage} from 'next';
import Link from 'next/link';
import React from 'react';
import {useHeader} from '../hooks/useHeader';
import  cookies from 'js-cookie'


const Home: NextPage = () => {
  const {PageHeader} = useHeader()
  console.log(cookies);
  return (
    <>
      {PageHeader}
      <div className="cover">
        <img src="/logo.png" alt=""/>
        <h1>Hasson的个人博客</h1>
        <p>好好学习，天天向上</p>
        <p><Link href="/posts"><a>文章列表</a></Link></p>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          padding: 0;
        }

        #components-layout-demo-top-side .logo {
          float: left;
          width: 120px;
          height: 31px;
          margin: 16px 24px 16px 0;
          background: rgba(255, 255, 255, 0.3);
        }

        .ant-row-rtl #components-layout-demo-top-side .logo {
          float: right;
          margin: 16px 0 16px 24px;
        }

        .site-layout-background {
          background: #fff;
        }

        .cover {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .cover > img {
          width: 240px;
          height: 240px;
        }
      `}</style>
    </>
  );
};

export default Home;
