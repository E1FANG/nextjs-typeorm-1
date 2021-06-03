import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {Card, Divider, Tag} from 'antd';
import {Post} from 'src/entity/Post';
import marked from 'marked';
import {CommentOutlined, EditOutlined, EyeOutlined, TagsOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {useTags} from './useTags';

export const useCard = (props: Post) => {
  const {id,content,title,updatedAt,viewCount,comments} = props
  const tagListData = props.tags.split(',')
  const router = useRouter()
  const {tagList} = useTags({tagListData});
  const toArticle =()=>{
    router.push(`/posts/${id}`)
  }
  const cards = (
      <>
          <Card className="card-wrapper" onClick={toArticle}>
            <Divider className="card-title" orientation="left">
              {title}
              <span className="updateAt">
                {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </Divider>
          <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(content)}} />
            <Divider />
            <div className="card-footer">
              <div>
                <CommentOutlined />{comments.length}
                <Divider type="vertical" />
                <EyeOutlined />{viewCount}
                <Divider type="vertical" />
                {/*<Tag icon={<EditOutlined //!*>} color="#55acee">*/}
                {/*  作者：{author.username}*/}
                {/*</Tag>*!/*/}
                <Divider type="vertical" />
                <TagsOutlined />
                {tagList}
              </div>
            </div>
        </Card>
        <style jsx>{`
        .card-wrapper{
        margin: 5px !important;
        width: 100%;
        }
        .markdown-body{
        min-height: 5em;
        max-height: 12em;
        overflow: hidden;
        }
        .card-title span{
        font-size: 24px!important;
        }
        .updateAt{
        margin-left: 24px;
        font-size: 12px!important;
        color:rgba(0,0,0,.85)
        }
        .card-footer{
        margin-top: 15px;
        }
        `}</style>
      </>
    );
  return {cards};
};
