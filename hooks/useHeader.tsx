import Link from 'next/link';
import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Menu, Avatar, Dropdown, Button, Row, Col} from 'antd';
import {useRouter} from 'next/router';
// @ts-ignore
import Cookies from 'js-cookie';
import axios from 'axios';
import {HomeOutlined, UnorderedListOutlined,createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2577502_3q3fgy3uzkl.js',
});

export const useHeader = () => {
  const {Header} = Layout;
  const defaultSelectedKeys = useRouter().pathname === '/posts' ? ['2'] : ['1'];
  // const user = Cookies.get('user') || null;
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(() => Cookies.get('user') || null);
  }, [user]);
  const logout = () => {
    Cookies.remove('user');
    Cookies.remove('blog', {path: '', domain: 'localhost'});
    axios.post(`/api/v1/logout`, user);
    setUser(null);
    alert('logout');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={logout}>logout</a>
      </Menu.Item>
    </Menu>
  );
  const PageHeader = (
    <>
      <div className="page-header">
        <Row>
          <Col span={6} style={{paddingLeft:"50px",fontSize:"16px"}}>
            <IconFont type="icon-wode" />
            Hasson's Blog
          </Col>
          <Col span={12}></Col>
          <Col span={6}>
            <div className="nav-wrapper">
              <Menu mode="horizontal" defaultSelectedKeys={defaultSelectedKeys}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link href="/"><a>首页</a></Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                  <Link href="/posts"><a>文章列表</a></Link>
                </Menu.Item>
              </Menu>

              {user === null ?
                <div className="user">
                  <Button style={{marginRight: '8px'}}>
                    <Link href="/sign_in"><a>登录</a></Link>
                  </Button>
                  <Button>
                    <Link href="/sign_up"><a>注册</a></Link>
                  </Button>
                </div>
                :
                <div className="user avatar-wrapper">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Avatar size={35} style={{color: '#fff', backgroundColor: 'rgb(24,144,255)'}}>
                    <span>
                      {JSON.parse(user).username}
                    </span>
                    </Avatar>
                  </Dropdown>
                </div>
              }
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          padding: 0;
        }

        .page-header {
          box-shadow: 0 2px 8px #f0f1f2;
        }

        .page-header .ant-col {
          padding: 15px 0 !important;
        }

        .nav-wrapper {
          display: flex;
          justify-content: flex-end;
          padding-right: 40px;
        }

        .user {
          line-height: 67px;
        }
        .user span {
          cursor: pointer;
        }
        .avatar-wrapper{
        line-height: 60px;
        margin-left: 15px;
        }
      `}</style>
    </>
  );
  return ({
    PageHeader
  });
};

