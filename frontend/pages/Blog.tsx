// import React from "react";
import { useBlog } from "../hooks/useBlog";
import { useNavigate, useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";
import { useEffect } from "react";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  const navigate= useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  if (!blog) {
    // Handle the case where blog is null
    return (
      <div>
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div>
      <FullBlog
        title={blog.title}
        authorName={blog.authorName}
        content={blog.content}
        thumbnail={blog.thumbnail}
        publishedDate={blog.publishedDate}
      />
    </div>
  );
};
