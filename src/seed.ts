import "reflect-metadata";
//引入连接数据库的方法
import {createConnection} from "typeorm";

// 创建链接 连接数据库
// 连接的是刚刚我们修改的ormconfig.json写的地址的数据库
createConnection().then(async connection => {
await connection.close()
}).catch(error => console.log(error));
