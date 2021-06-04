import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {withSession} from '../lib/withSession';
import {User} from '../src/entity/User';
import {useForm} from '../hooks/useForm';
import qs from 'querystring';
// @ts-ignore
import Cookies from 'js-cookie';
import {Button} from 'antd';

const SignIn: NextPage<{ user: User }> = (props) => {
  const {form} = useForm(
    {
      initFormData: {username: '', password: ''},
      fields: [
        {
          label: '用户名', type: 'text', key: 'username'
        },
        {
          label: '密码', type: 'password', key: 'password'
        }],
      buttons: <Button style={{width: 'calc(100% - 5em)', float: 'right'}} type='primary'>登录</Button>,
      submit: {
        request: formData => axios.post(`/api/v1/sessions`, formData),
        success: (res: AxiosResponse) => {
          window.alert('登录成功');
          const user = res.data;
          const query = qs.parse(window.location.search.substr(1));
          Cookies.set('user', JSON.stringify(user), {expires: 1});
          Object.keys(query).length !== 0 ?
            window.location.href = query.returnTo.toString()
            : window.location.href = '/posts';
        }
      }
    });
  return (
    <>
      <div className="login">
        <h1>登录</h1>
        {form}
      </div>
      <style jsx>{`
        .login {
          max-width: 400px;
          margin: 16px auto;
          padding: 50px 16px;
          padding-bottom: 100px;
        }
      `}</style>
    </>);
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
async (context: GetServerSidePropsContext) =>
{
// @ts-ignore
const user = context.req.session.get('currentUser');
  return {
    props: {
      user: JSON.parse(JSON.stringify(user || ''))
    }
  };
}
);
