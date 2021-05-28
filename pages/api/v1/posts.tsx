import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {Tag} from '../../../src/entity/Tag';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSession';

type arr = Tag[]

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const connection = await getDatabaseConnection();
    const {title, content} = req.body.posts;
    // const tags =  req.body.posts.tags
    const post = new Post();
    post.title = title;
    post.content = content;
    // post.tags = tags.join(',')
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    post.author = user;
    // let arr:arr = []
    // for(let i=0;i++;i<tags.length){
    //   // arr:arr = []
    //   arr[i].tags = tags[i]
    //   await connection.manager.save(arr[i])
    // }
    let tag1 = new Tag();
    tag1.tagName = "Bears";
    await connection.manager.save(tag1);

    let tag2 = new Tag();
    tag2.tagName = "Me";
    await connection.manager.save(tag2);
    // post.tags= arr
    post.tagName = [tag1,tag2]
    await connection.manager.save(post)
    res.json(post);
  }
});
export default Posts;
