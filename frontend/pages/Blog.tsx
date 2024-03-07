// import React from "react";
import { useBlog } from "../hooks/useBlog";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  return (
    <div>
      <Appbar />
      {loading ? (
        <Skeleton />
      ) : (
        <FullBlog
          title={blog.title}
          authorName={blog.authorName}
          content={blog.content}
          thumbnail={blog.thumbnail}
          publishedDate={blog.publishedDate}
        />
      )}
    </div>
  );
};
