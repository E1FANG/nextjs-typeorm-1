import Link from 'next/link';
import React, { useEffect, useState} from 'react';
import {Menu, Avatar, Dropdown, Button, Row, Col, Input, Divider} from 'antd';
import {useRouter} from 'next/router';
// @ts-ignore
import Cookies from 'js-cookie';
import axios from 'axios';
import {HomeOutlined, UnorderedListOutlined, SearchOutlined,UserOutlined} from '@ant-design/icons';
import {useIcon} from './useIcon';

export const useHeader = () => {
  const {IconFont} = useIcon()
  const router = useRouter();
  const defaultSelectedKeys = ()=>{
    if( router.pathname.indexOf('/posts') != -1){
      return ['2']
      }else if(router.pathname.indexOf('/about') != -1){
      return['3']
    }else{
      return  ['1']
    }
  }
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

  const searchTitle = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    const searchTitleKeyword = e.currentTarget.value
    router.push(`/posts/search/${searchTitleKeyword}`)
  }
  const PageHeader = (
    <>
      <div className="page-header">
        <Row justify="space-between" wrap={false}>
          <Col lg={5} md={8} xs={0} style={{fontSize:"16px",textAlign:'center'}}>
            <IconFont type="icon-river"/>
            Hasson's Blog
          </Col>
          <Col lg={9} md={0} xs={0}>
            <div className="search-wrapper">
              <Input size="large" placeholder="搜索文章标题"
                     onPressEnter={(e)=>searchTitle(e)}
                     prefix={<SearchOutlined  style={{color: '#8590a6'}} />} />
            </div>
          </Col>
          <Col lg={10} md={11} xs={24}>
            <div className="nav-wrapper">
              <Menu mode="horizontal" defaultSelectedKeys={defaultSelectedKeys()}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link href="/"><a>首页</a></Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                  <Link href="/posts"><a>文章列表</a></Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  <Link href="/about"><a>关于</a></Link>
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
        display: flex;
        align-items: center;
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

