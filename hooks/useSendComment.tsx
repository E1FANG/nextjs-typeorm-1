import {Form, Tag, Button, Input, Avatar, message} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import axios from 'axios';
import {Post} from '../src/entity/Post';
import {User} from '../src/entity/User';
import {Comment} from '../src/entity/Comment';
import Link from 'next/link';

const {TextArea} = Input;

type options = {
  // content:string;
  post: Post;
  currentUser: User;
  updateComment:(comment:Comment)=>void
}
export const useSendComment = (options: options) => {
  const {post, currentUser,updateComment} = options;
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    if(value===''){
      message.error('内容不能为空');
      return
    }
    setSubmitting(true)
    axios.post('/api/v1/comments', {
      content: value,
      post,
      user:currentUser
    }).then(res => {
      setValue('')
      setSubmitting(false)
      updateComment(res.data)
      message.success('sendComment succeeded');
    });
  };
  const onChange = (e: string) => {
    setValue(e);
  };
  const sendComment = (
    <>
      <div className="comment-wrapper">
        <div className="avatar-warpper">
          {currentUser ?
          <Avatar size={35} style={{color: '#fff', backgroundColor: 'rgb(24,144,255)'}}>
                    <span>
                      {currentUser.username}
                    </span>
          </Avatar> :
            <Link href="/sign_in"><a>请登录</a></Link>
          }
        </div>
        <div className="form-wrapper">
          <Form.Item>
            <TextArea rows={4} onChange={(e) => onChange(e.target.value)} value={value}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" disabled={currentUser===null} loading={submitting} onClick={onSubmit} type="primary">
              发送评论
            </Button>
          </Form.Item>
        </div>
      </div>

      <style jsx>{`
        .comment-wrapper{
        display: flex;
        margin-top: 35px;
        }
        .avatar-warpper{
        padding: 5px 15px 0 0;
        }
        .form-wrapper{
        flex: 1;
        }
      `}</style>
    </>
  );
  return {
    sendComment
  };
};
