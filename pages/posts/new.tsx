import {NextPage} from 'next';
import React, {useCallback, useState} from 'react';
import {Form} from '../../components/Form';

const PostsNew : NextPage = ()=>{
  const [formData,setFormData] = useState({
    title:'',
    content:''
  })
  const [errors, setErrors] = useState({
    title: [], content: []
  });
  const onChange = useCallback((key,value)=>{
    setFormData({...formData,[key]:value})
  },[formData])
  const  onSubmit = useCallback((e)=>{
    e.preventDefault();
  },[formData])
  return(
    <div>
      <Form fields={[
        {
          label: '标题', type: 'text', value: formData.title,
          onChange: e=>onChange('title',e.target.value),
          errors: errors.title
        },
        {
          label: '内容', type: 'textarea', value: formData.title,
          onChange: e=>onChange('title',e.target.value),
          errors: errors.title
        }
      ]} onSubmit={onSubmit} buttons={<>
        <button type='submit'>提交</button>
      </>}/>
    </div>
  )
}

export default PostsNew;
