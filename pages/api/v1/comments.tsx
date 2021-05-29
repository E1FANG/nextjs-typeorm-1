import {NextApiHandler} from 'next';
import {Comment} from '../../../src/entity/Comment';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {withSession} from '../../../lib/withSession';
import {User} from '../../../src/entity/User';


const Comments: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    const connection = await getDatabaseConnection();
    const {content,post} = req.body
    const comment = new Comment();
    comment.content = content
    const user = req.session.get('currentUser');
    comment.user = user
      comment.post = post
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const result =  await connection.manager.save(comment)
    res.json(result);
  }
});
export default Comments;
