import { Calendar, User, Clock, BookOpen, Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Blog {
  title: string;
  content: string;
  authorName: string;
  thumbnail: string;
  publishedDate: string;
}

export const FullBlog = ({
  title,
  content,
  authorName,
  thumbnail,
  publishedDate,
}: Blog) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 50);

  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };


  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to blogs
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-200 ${isLiked
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">{authorName}</span>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                <span>{publishedDate}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                <span>{readingTime} min read</span>
              </div>

              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
                <span>{wordCount} words</span>
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center space-x-6 py-4 border-y border-gray-200">
              <div className="flex items-center text-gray-600">
                <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span className="font-medium">{likes}</span>
                <span className="ml-1">likes</span>
              </div>

              <div className="flex items-center text-gray-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">0</span>
                <span className="ml-1">comments</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed text-lg">
              {content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6 text-justify">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Written by {authorName}</p>
                  <p className="text-gray-600 text-sm">Published on {publishedDate}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex space-x-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${isLiked
                      ? 'bg-red-500 text-white shadow-lg hover:bg-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};