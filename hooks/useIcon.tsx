import {createFromIconfontCN } from '@ant-design/icons';
import React from 'react';


export const useIcon = ()=>{
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2577502_mka1qbh30x.js',
  });
  return {
    IconFont
  }
}
