import {NextPage} from 'next';
import React from 'react';
import axios from 'axios';
import {useForm} from '../hooks/useForm';
import {Button} from 'antd';

const SignUp: NextPage = () => {
  const initFormData = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };
  const {form} = useForm(
    {
      initFormData,
      fields: [
        {
          label: '用户名', type: 'text', key: 'username'
        },
        {
          label: '密码', type: 'password', key: 'password'
        },
        {
          label: '确认密码', type: 'password', key: 'passwordConfirmation',
        }
      ],
      buttons: <Button style={{width:'calc(100% - 5em)',float:'right'}} type='primary'>注册</Button>,
      submit:{
        request:formData => axios.post(`/api/v1/users`, formData),
        success:()=>{
          window.alert('注册成功')
          window.location.href = '/sign_in'
        }
      }
    }
  );
  return (
    <>
      <div className="signin">
        <h1>注册</h1>
        {form}
      </div>
      <style jsx>{`
        .signin {
          max-width: 400px;
          margin: 16px auto;
          padding: 50px 16px;
          padding-bottom: 100px;
        }
      `}</style>
    </>
  );
};

export default SignUp;
