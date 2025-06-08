import { BlogCard } from "../components/BlogCard";
import {useBlogs} from '../hooks/useBlogs'
import {Skeleton} from '../components/Skeleton'
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

interface BlogsProps {
  searchQuery: string;
}
export const Blogs = ({ searchQuery }: BlogsProps) => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();
  if (loading === true) {
    <div>Loading.....</div>;
  }
  console.log(searchQuery);
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.authorName}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                thumbnail={blog.thumbnail}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
