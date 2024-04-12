import React, { useCallback, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { Post } from "../../src/entity/Post";
import { Comment as entityComment } from "../../src/entity/Comment";
import { withSession } from "../../lib/withSession";
import { User } from "../../src/entity/User";
import { useHeader } from "../../hooks/useHeader";
import { Timeline } from "antd";
import Link from "next/link";
import dayjs from "dayjs";

type Props = {
  tag: string;
  tagResult: Post[];
  post: Post;
  currentUser: User | null;
  comments: entityComment[];
};
const TagSearch: NextPage<Props> = (props) => {
  const { tag, tagResult } = props;
  const { PageHeader } = useHeader();
  return (
    <>
      {PageHeader}
      <div className="wrapper">
        <Timeline>
          <Timeline.Item>
            <span className="tag-title">{tag}</span>
          </Timeline.Item>
          {tagResult.map((e) => (
            <Timeline.Item>
              <Link href={`/posts/${e.id}`}>
                <a>
                  <span className="post-time">
                    {dayjs(e.createdAt).format("YYYY-MM-DD")}
                  </span>
                  {e.title}
                </a>
              </Link>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 1200px;
          margin: 16px auto;
          padding: 50px 16px;
          padding-bottom: 100px;
        }
        .tag-title {
          font-size: 36px !important;
          font-weight: bolder;
        }
        .post-time {
          color: black;
          padding-right: 36px;
        }
      `}</style>
    </>
  );
};

export default TagSearch;

export const getServerSideProps: GetServerSideProps<any, { tag: string }> =
  withSession(async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const postRepository = connection.getRepository(Post);
    const tag = context.params.tag;
    const currentUser = (context.req as any).session.get("currentUser") || null;
    const tagResult = await postRepository
      .createQueryBuilder("post")
      .where("post.tags like :tags", { tags: `%${!!tag ? tag : ""}%` })
      .getMany();
    return {
      props: {
        tag,
        tagResult: JSON.parse(JSON.stringify(tagResult)),
      },
    };
  });
