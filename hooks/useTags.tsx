import {Tag} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';

type options = {
  tagListData?: string[] ;
  singleTagData?: string;
}

const colorOptions = [
  {val: 'JavaScript', color: 'magenta'},
  {val: 'React', color: 'volcano'},
  {val: 'Vue', color: 'orange'},
  {val: 'TypeScript', color: 'gold'},
  {val: 'Webpack', color: 'green'},
  {val: 'HTTP', color: 'cyan'},
  {val: 'TypeORM', color: 'blue'},
  {val: 'Node', color: 'geekblue'},
  {val: 'git', color: 'purple'},
  // {val: 'default', color: 'red'},
];


const tag = (data: string) => {
  const [color, setColor] = useState('');
  useEffect(() => {
    let newColor = '';
    colorOptions.forEach(e => {
      if (e.val === data) {
        newColor = e.color;
      }
    });
    setColor(newColor);
  }, [data]);
  return (
    <>
      <Tag color={color || 'red'}>{data}</Tag>
    </>
  );
};

export const useTags = (options: options) => {
  const {tagListData,singleTagData} = options;
  const tagList = (
    <>
      {tagListData.map((e,i) =>
        <Link href={`/tags/${e}`} key={e}>
          <a>{tag(e)}</a>
        </Link>
      )}
    </>
  );
  const singleTag = (
    <>
      {tag(singleTagData)}
    </>
  )
  return {tagList,singleTag};
}
;
