import "reflect-metadata";
//引入连接数据库的方法
import {createConnection} from "typeorm";
import {User} from './entity/User';
import {Post} from './entity/Post';
import {Comment} from './entity/Comment';

// 创建链接 连接数据库
// 连接的是刚刚我们修改的ormconfig.json写的地址的数据库
createConnection().then(async connection => {
  const {manager} = connection;
  //创建 user 1
  const u1 = new User()
  u1.username = 'hasson'
  u1.passwordDigest = 'xxx'
  await manager.save(u1)

  // 创建 post 1
  const p1 = new Post()
  p1.title = 'Post 1'
  p1.content = 'My First Post'
  p1.author = u1  //创建关联的好处：通过对象的方式，把u1的id传给post
  await manager.save(p1)

  //创建 comment 1
  const c1 = new Comment()
  c1.user = u1
  c1.post = p1
  c1.content = 'Cool!'
  await manager.save(c1)
  console.log(c1.id);

  await connection.close()
  console.log('OK!');
}).catch(error => console.log(error));
