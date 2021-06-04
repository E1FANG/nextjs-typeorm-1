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
  const buttons = <button style={{
    width: 'calc(100% - 5em)', float: 'right',background:'rgb(24,144,255)',color:'white',border:'none',padding:'5px 0'
  }} type='submit'>注册</button>
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
      buttons: buttons,
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
