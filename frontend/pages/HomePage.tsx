import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Sparkles, PenTool, Users, Heart, Github, Twitter } from "lucide-react";
import image1 from '../assets/image-1.jpeg';
import image2 from '../assets/image-2.jpeg'; 
import image3 from '../assets/image-3.jpeg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const images = [image1, image2, image3];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BlogVista
              </span>
            </div>
            
            <Link 
              to="/signin"
              className="inline-flex items-center justify-center px-4 py-2 border border-blue-200 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Your Ultimate Blogging Destination</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Stories That
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Inspire & Transform
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to BlogVista, where passionate writers share their thoughts and readers 
              discover amazing content. Join our community of storytellers and thought leaders.
            </p>
            
            <Link 
              to="/signin"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          {/* Image Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Stories</h2>
              <p className="text-gray-600">Discover the most engaging content from our community</p>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={2000}
                transitionTime={500}
                className="mt-4"
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <div className="border-0 rounded-2xl overflow-hidden bg-white shadow-lg">
                      <div className="relative h-64 md:h-80">
                        <img 
                          src={image} 
                          alt={`Featured content ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BlogVista?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the perfect blend of creativity and discovery in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white rounded-lg">
              <div className="p-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Write Freely
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Express your thoughts with our intuitive editor. Whether you're crafting 
                  personal stories, technical tutorials, or creative fiction, our platform 
                  provides the perfect canvas for your ideas.
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Rich Text Editor</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Community Support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white rounded-lg">
              <div className="p-8">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Read Widely
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Discover amazing content from writers around the world. Explore diverse 
                  topics, follow your favorite authors, and join meaningful conversations 
                  that expand your horizons.
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Curated Content</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Personalized Feed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-gray-300">Built with</span>
              <Heart className="h-5 w-5 text-red-500 animate-pulse" />
              <span className="text-gray-300">by</span>
              <span className="font-semibold text-white">Sagar</span>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <a 
                href="https://github.com/sagarb2003" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">GitHub</span>
              </a>
              
              <div className="w-px h-6 bg-gray-600" />
              
              <a 
                href="https://x.com/sagarb2003" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Twitter</span>
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © 2025 BlogVista. Made with passion for storytellers everywhere.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};