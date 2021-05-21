# 初始代码

## 启动数据库
```
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
````
## 清空之前的开发环境
```
docker kill 容器id
docker rm 容器id
docker container prune
docker volume rm blog-data
```

## 创建数据库
```
docker exec -it 容器id bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表
首先修改 ormconfig.json 中的host，然后运行
```
yarn m:run
node dist/seed.js
```
## 创建表
```
yarn m:create -n CreatrUsers(表名)
```

## 开发

```bash
yarn dev
# or
npm run dev
```

## 部署
自动化部署：
```bash
ssh blog@47.113.225.0 'sh /home/blog/app/bin/deploy.sh'
```

```bash 
yarn install --production=false
yarn build
docker build . -t hasson/node-web-app
docker run --network=host  -p 3000:30000 -d hasson/node-web-app
```

