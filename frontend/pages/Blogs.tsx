import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import {useBlogs} from '../hooks/useBlogs'
import {Skeleton} from '../components/Skeleton'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
  const navigate=useNavigate();
  const {blogs,loading}=useBlogs();
  if(loading === true){
    <div>Loading.....</div>
  }
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/signin');
    }
  },[])
  return (
    <>
      <div>
        <Appbar />
      </div>
      {loading ? (
        <Skeleton/>
      ) : (
        <div className="flex justify-center">
          <div>
            {blogs.map((blog) => {
              return (
                <>
                  <BlogCard
                    id={blog.id}
                    authorName={blog.authorName}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                    thumbnail={blog.thumbnail}
                  />{" "}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
