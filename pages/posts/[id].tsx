import React, { useCallback, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "../../src/entity/Post";
import { Comment as entityComment } from "../../src/entity/Comment";
import marked from "marked";
import Link from "next/link";
import { withSession } from "../../lib/withSession";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "../../src/entity/User";
import { useGoback } from "../../hooks/useGoback";
import { Tag, Divider, Comment, List, Avatar } from "antd";
import { EditOutlined, EyeOutlined, TagsOutlined } from "@ant-design/icons";
import { useSendComment } from "../../hooks/useSendComment";
import dayjs from "dayjs";
import { useTags } from "../../hooks/useTags";

type Props = {
  id: number;
  post: Post;
  currentUser: User | null;
  comments: entityComment[];
};
const postsShow: NextPage<Props> = (props) => {
  const { post, currentUser, id } = props;
  const [comments, setComments] = useState(props.comments);
  const tagListData = post.tags.split(",");
  const { tagList } = useTags({ tagListData });
  const { back } = useGoback("/posts");
  const router = useRouter();
  const onRemove = useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(
      () => {
        window.alert("删除成功");
        router.push("/posts");
      },
      () => {
        window.alert("删除失败");
      }
    );
  }, [id]);
  const updateComment = (newComment: entityComment) => {
    setComments((comments) => [newComment, ...comments]);
  };
  const { sendComment } = useSendComment({ post, currentUser, updateComment });
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>
            {" "}
            {back}
            {post.title}
          </h1>
          <div>
            <EyeOutlined />
            {post.viewCount}
            <Divider type="vertical" />
            <Tag icon={<EditOutlined />} color="#55acee">
              作者：{post.author.username}
            </Tag>
            <Divider type="vertical" />
            <TagsOutlined />
            {tagList}
            更新于：{dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
          <Divider />
          {currentUser && currentUser.id === post.author.id && (
            <p className="actions">
              <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}>
                <a>编辑</a>
              </Link>
              <button onClick={onRemove}>删除</button>
            </p>
          )}
        </header>
        <article
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        ></article>

        <Divider orientation="left" style={{ marginTop: "150px" }}>
          评论区
        </Divider>
        {sendComment}
        <Divider />
        <div>
          <List
            className="comment-list"
            header={`${comments.length} 条评论`}
            itemLayout="horizontal"
            // dataSource={comments.length!== 0 ? comments:null}
            dataSource={comments}
            renderItem={(item) => (
              <li>
                <Comment
                  // actions={item.actions}
                  author={item.user.username}
                  avatar={
                    <Avatar
                      size={35}
                      style={{
                        color: "#fff",
                        backgroundColor: "rgb(24,144,255)",
                      }}
                    >
                      <span>{item.user.username}</span>
                    </Avatar>
                  }
                  content={item.content}
                  datetime={dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                />
              </li>
            )}
          />
        </div>
      </div>
      <style jsx>{`
        .actions > * {
          margin: 4px;
        }

        .actions > *:first-child {
          margin-left: 0;
        }

        .wrapper {
          max-width: 1200px;
          margin: 16px auto;
          padding: 0 16px;
          padding-bottom: 100px;
        }

        header > div,
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> =
  withSession(async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const id = context.params.id;
    const currentUser = (context.req as any).session.get("currentUser") || null;
    let post = await connection
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .where("post.id = :id", { id })
      .getOne();
    const viewCount = post.viewCount + 1;

    await connection
      .createQueryBuilder()
      .update(Post)
      .set({ viewCount: viewCount })
      .where("id = :id", { id: id })
      .execute();

    post = { ...post, viewCount };

    const commentRepository = connection.getRepository(entityComment);
    const comments = await commentRepository.find({
      relations: ["user"],
      where: { post: post },
    });
    return {
      props: {
        id: parseInt(id.toString()),
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
        comments: JSON.parse(JSON.stringify(comments)),
      },
    };
  });
