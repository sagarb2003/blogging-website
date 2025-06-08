import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  thumbnail: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  thumbnail,
}: BlogCardProps) => {
   function compressContent(){
    const words=content.split(' ');
    return words.length>20 ? words.slice(0,20).join(' '):content;
   }
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 transition-transform duration-300 hover:scale-[1.02]">
        <div className="flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden md:flex-row md:max-w-2xl hover:shadow-md transition-shadow duration-300">

          <img
            className="object-cover w-full h-64 md:h-48 md:w-48 transition-transform duration-300 hover:scale-105"
            src={thumbnail}
            alt=""
          />
          <div className="flex flex-col justify-between p-6 leading-normal w-full">
            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{publishedDate}</span>
              </div>
            </div>
            
            <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors duration-200">
              {title}
            </h5>
            
            <p className="mb-4 text-gray-600 line-clamp-2">
              {compressContent()}
            </p>
            
            <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <span className="text-sm font-medium">Read more</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
