import React, {useCallback, useState} from 'react';
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {useHeader} from '../hooks/useHeader';
import {Divider} from 'antd';
import {useIcon} from '../hooks/useIcon';
import {MailOutlined, QqOutlined} from '@ant-design/icons';

const About: NextPage = () => {
  const {PageHeader} = useHeader();
  const {IconFont} = useIcon();
  return (
    <>
      {PageHeader}
      <div className="about-wrapper">
        <Divider orientation="left" plain>
          博客简述
        </Divider>
        <div>前端：React + TypeScript + hooks + antd</div>
        <div>后端：Node + Next + Typeorm + Psql</div>
        <div>部署：Nginx + 阿里云</div>
        <div>源码地址：<a href="https://github.com/E1FANG/nextjs-typeorm-1">GitHub</a></div>
        <Divider orientation="left" plain>
          关于我
        </Divider>
        <ul>
          <li>姓名：hasson</li>
          <li>联系方式：<QqOutlined/>438283787 | <MailOutlined/>438283787@qq.com</li>
          <li>地址：广州市</li>
          <li>
            其他博客地址：
            <a href="https://www.yuque.com/u640022?tab=books">
              <IconFont type="icon-tubiaozhizuomoban"/>语雀</a>
          </li>
          <li>
            技能
            <ul>
              <li>HTML, CSS, JavaScript: 熟练开发符合W3C标准页面，熟练使用ES6语法</li>
              <li>TypeScript: 掌握TypeScript通常用法，包含泛型，接口等，并有相关项目经验</li>
              <li>Vue: 熟练使用Vue技术及其技术栈并有相关工作经验</li>
              <li>React：了解React相关知识并有相关项目经验</li>
              <li>数据可视化: 熟练使用Echart制作复杂可交互图表</li>
              <li>WebPack：能够自己搭建WebPack，拆包分包等性能优化工作</li>
              <li>Node：可以进行简单的后端接口开发</li>
              <li>Psql:可以进行简单的数据类型设计</li>
            </ul>
          </li>
          <li>
            其他：
            <ul>
              <li>常用系统：windows,Ubuntu</li>
              <li>常用工具：VSCode,WebStorm,Chrome,Postman</li>
            </ul>
          </li>
          <li>
            个人：喜爱代码，游戏，篮球
          </li>
        </ul>
      </div>
      <style jsx>{`
        .about-wrapper {
        }
      `}</style>
    </>
  );
};

export default About;
