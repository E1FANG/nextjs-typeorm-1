import {createConnection, getConnectionManager} from 'typeorm';

const promise = (async function (){
  const manager = getConnectionManager()
  const hasDefaultConnection = manager.has('default')
  if(!hasDefaultConnection){
    console.log('创建connection');
    return createConnection()
  }else{
    console.log('复用connection');
    return manager.get('default')
  }
})()

export const getDatabaseConnection = async ()=>{
  return  promise
}
