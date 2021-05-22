import Link from 'next/link';
import React from 'react';
import {Button} from 'antd';
import {Layout, Menu, } from 'antd';
import {useRouter} from 'next/router';

export const useHeader = () => {
  const {Header} = Layout;
  const defaultSelectedKeys = useRouter().pathname==='/posts'? ['2']:['1']
  const PageHeader = (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" style={{color: 'white', margin: '0 16px'}}>logo</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={defaultSelectedKeys}>
            <Menu.Item key="1">
              <Link href="/"><a>首页</a></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/posts"><a>文章列表</a></Link>
            </Menu.Item>
          </Menu>
          <div className="user">
            <Button style={{marginRight:"8px"}}>
              <Link href="/sign_in"><a>登录</a></Link>
            </Button>
            <Button>
              <Link href="/sign_up"><a>注册</a></Link>
            </Button>
          </div>

        </Header>
      </Layout>
      <style jsx>{`
        .header {
          display: flex;
          padding: 0;
        }

        .user {
          position: absolute;
          right: 15px;
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

      `}</style>
    </>
  );
  return ({
    PageHeader
  });
};

