import React, {ReactChild} from 'react';
import {useRouter} from 'next/router';


export const useGoback =()=>{
  const router = useRouter()
  const goBack = ()=>{
    router.push('/posts')
  }
  const back:ReactChild = (
    <>
      <span onClick={goBack}>《  </span>

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
