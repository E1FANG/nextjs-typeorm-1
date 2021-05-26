import {NextPage} from 'next';
import axios from 'axios';
import {Form, Input, Tag, Button} from 'antd';
import {CheckCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useCallback, useState} from 'react';

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
const { Search } = Input;
type options = {
  tag: string
}

const PostsNew: NextPage = () => {
  const [tags, setTags] = useState(['JavaScript']);
  const onFinish = (values: any) => {
    values.posts = {...values.posts,tags}
    console.log(values);
    axios.post(`/api/v1/posts`, values).then(res=>{
      const result = res.data
      window.alert('提交成功')
      window.location.href = `/posts/${result.id}`
    })
  };
  const removgTag =(removedTag:string)=> {
    const newTags =tags.filter(tag=>tag!==removedTag)
    setTags(newTags)
  }
const addTag = (addTag:string)=>{
    const interTags = tags
    if(addTag === ''){
      alert('标签内容不能为空')
      return
    }
    let flag = false
  for(let i =0;i<interTags.length;i++){
    if(addTag === interTags[i]){
      alert('已存在相同标签')
      flag = true
      break
    }
  }
  if(!flag) setTags(tags.concat(addTag))
}

  return (
    <div className="postsNew">
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item name={['posts', 'title']}
                   rules={[{ required: true, message: 'Please input your posts title!' }]}
                   label="标题">
          <Input/>
        </Form.Item>
        <div className="tagsWrapper">
          <Search
            placeholder="input tag text"
            allowClear
            enterButton="add"
            size="large"
            onSearch={(e)=>{
              addTag(e)
            }}
          />
          <div>
            {tags.map(element =>
              <Tag  closable onClose={(e)=>{
                e.preventDefault();
                removgTag(element)
              }} icon={<CheckCircleOutlined/>} color="red">
                <span> {element}</span>
              </Tag>)}
          </div>
        </div>
        <Form.Item name={['posts', 'content']}
                   label="内容"
                   rules={[{ required: true, message: 'Please input your posts content!' }]}
        >
          <Input.TextArea autoSize={ {minRows: 20} }/>
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <style jsx >{`
        .postsNew{
        margin: 50px auto;
        max-width: 800px;
        }
        .tagsWrapper{
        margin-left: 51px;
        margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
};

export default PostsNew;
