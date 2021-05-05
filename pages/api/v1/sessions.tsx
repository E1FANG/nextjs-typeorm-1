import {NextApiHandler} from 'next';
import {SignIn} from '../../../src/model/SignIn';
import {withSession} from '../../../lib/withSession';

//withSession 就是一个中间件 实际上就是在Sessions里面加上一个session这么一个东西
const Sessions: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const signIn =new SignIn()
  signIn.username = username
  signIn.password= password
  await signIn.validate()
  if(signIn.hasErrors()){
    res.statusCode = 422
    res.end(JSON.stringify(signIn.errors))
  }else{
    //把当前登录的用户记录到服务器上的内存或文件上
    // 这样下次用户登录时，就能记住了。如何记住的：因为在cookies里面留了一个用户的id
    req.session.set('currentUser',signIn.user)
    await req.session.save()
    res.statusCode = 200
    res.end(JSON.stringify(signIn.user))
  }
};
export default withSession(Sessions);
