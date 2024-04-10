import { NextApiHandler } from "next";
import { Post } from "../../../src/entity/Post";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";
import { withSession } from "../../../lib/withSession";

const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === "POST") {
    const connection = await getDatabaseConnection();
    const { title, content } = req.body.posts;
    const tags = req.body.posts.tags;
    const post = new Post();
    post.title = title;
    post.viewCount = 0;
    post.content = content;
    post.tags = tags.join(",");
    const user = req.session.get("currentUser");
    console.log("----------------");
    console.log(user);
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    post.author = user;
    await connection.manager.save(post);
    res.json(post);
  }
});
export default Posts;
