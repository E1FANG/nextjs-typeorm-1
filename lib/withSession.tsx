// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session'
import {GetServerSideProps, NextApiHandler} from 'next';

export  function withSession(handler :NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    //password：cookies加密的密钥（防止其他人篡改）
    // password: process.env.SECRET,
    password:'a011aaf5-bf82-47a1-b78f-775c9f05df75',
    cookieName: 'blog',
    cookieOptions:{
      secure:false,
      // @ts-ignore
      maxAge:60*60*24
    }
  })
}
