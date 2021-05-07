import {NextPage} from 'next';
import React from 'react';
import {useForm} from '../../hooks/useForm';
import axios from 'axios';

const PostsNew: NextPage = () => {
  //类型是静态分析，不受运行顺序影响
  const {form} = useForm(
    {
      initFormData:{title: '', content: ''},
      fields: [
        {label: '标题', type: 'text', key: 'title',},
        {label: '内容', type: 'textarea', key: 'content'}
      ],
      buttons: <button>提交</button>,
      submit:{
        request:formData => axios.post(`/api/v1/posts`,formData),
        message:'提交成功'
      }
    }
  );
  return (
    <div>{form}</div>
  );
};

export default PostsNew;
