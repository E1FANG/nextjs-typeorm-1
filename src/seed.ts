import "reflect-metadata";
//引入连接数据库的方法
import {createConnection} from "typeorm";
import {User} from './entity/User';

// 创建链接 连接数据库
// 连接的是刚刚我们修改的ormconfig.json写的地址的数据库
createConnection().then(async connection => {
  const {manager} = connection;
  const u1 = new User()
  u1.username = 'hasson'
  u1.passwordDigest = 'xxx'
  await manager.save(u1)
  console.log(u1.id);
  await connection.close()
}).catch(error => console.log(error));
