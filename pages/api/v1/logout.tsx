import {NextApiHandler} from 'next';
import {withSession} from '../../../lib/withSession';

//withSession 就是一个中间件 实际上就是在Sessions里面加上一个session这么一个东西
const Logout: NextApiHandler = async (req, res) => {
  //清空cookies和服务器session
    req.session.destroy()
    res.statusCode = 200
    res.end(JSON.stringify({data:'success'}))
};
export default withSession(Logout);
