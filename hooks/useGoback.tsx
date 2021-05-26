import React, {ReactChild} from 'react';
import {useRouter} from 'next/router';
import {CaretLeftOutlined} from '@ant-design/icons';

// type options = {
//   url:string
// }

type url = string

export const useGoback =(url:url)=>{
  const router = useRouter()
  const goBack = ()=>{
    // router.back()
    router.push(url)
  }
  const back:ReactChild = (
    <>
      <span onClick={goBack}><CaretLeftOutlined style={{color:"#333"}}/></span>

      <style jsx>{`
      
      span {
        color: #666;
        cursor:pointer;
      }
    `}</style>
    </>
  )
  return {
    back
  }
}
