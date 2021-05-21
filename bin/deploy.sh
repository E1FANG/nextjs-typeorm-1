docker start 923 &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build  -t hasson/node-web-app . &&
docker run --name app --network=host  -p 3000:30000 -d hasson/node-web-app &&
echo 'OK!'
