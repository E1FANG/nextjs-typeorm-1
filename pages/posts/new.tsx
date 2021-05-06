import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {Form} from '../../components/Form';
import {useForm} from '../../hooks/useForm';
import axios, {AxiosResponse} from 'axios';

const PostsNew: NextPage = () => {
  //类型是静态分析，不受运行顺序影响
  const onSubmit = (formData: typeof initFormData) => {
    console.log('submit');
    console.log(formData);
    axios.post('/api/v1/posts', formData)
      .then(() => {
        window.alert('提交成功');
      }, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      });
  };
  const initFormData = {title: '', content: ''};
  const {form, setErrors} = useForm(
    {
      initFormData,
      fields: [
        {label: '标题', type: 'text', key: 'title',},
        {label: '内容', type: 'textarea', key: 'content'}
      ],
      buttons: <button>提交</button>,
      onSubmit
    }
  );
  return (
    <div>{form}</div>
  );
};

export default PostsNew;
