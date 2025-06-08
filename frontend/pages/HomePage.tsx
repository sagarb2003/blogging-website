import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import image from '../assets/blogvista.png';
import image1 from '../assets/image-1.png';
import image2 from '../assets/image-2.png';
import image3 from '../assets/image-3.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { BookOpen, Github,Pencil,Twitter } from 'lucide-react';

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md py-4 px-6 md:px-10 lg:px-16">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <img src={image} alt="BlogVista Logo" className="h-10 w-auto" />
                    </div>
                    <Link to="/signin" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24 px-6 md:px-10 lg:px-16 flex-grow">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="md:w-1/2">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                        >
                            Share Your Story With The World
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-6 text-lg md:text-xl text-gray-600"
                        >
                            Your ideas deserve to be heard. Start writing today and connect with readers around the globe.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300 ease-in-out">
                                Get Started
                            </Link>
                            <Link to="/signin" className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg font-medium transition duration-300 ease-in-out">
                                Explore Blogs
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="md:w-1/2"
                    >
                        {/* <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-30"></div>
                            <div className="relative bg-white p-6 rounded-lg shadow-xl "> */}
                                <Carousel
                                autoPlay
                                infiniteLoop
                                showStatus={false}
                                showThumbs={false}
                                showIndicators={false}
                                interval={3000}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="h-full">
                                    <img src={image1} alt="Blog Feature 1" className="w-full h-full object-contain" />
                                </div>
                                <div className="h-full">
                                    <img src={image2} alt="Blog Feature 2" className="w-full h-full object-contain" />
                                </div>
                                <div className="h-full">
                                    <img src={image3} alt="Blog Feature 3" className="w-full h-full object-contain" />
                                </div>
                            </Carousel>
                            {/* </div>
                        </div> */}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
                    >
                        Our Features
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <Pencil className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Write Freely</h3>
                            <p className="text-gray-600">Express your thoughts without limitations. Our intuitive editor makes writing a pleasure, not a chore.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Read Widely</h3>
                            <p className="text-gray-600">Discover diverse perspectives and ideas from writers around the world. Expand your horizons with every read.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-8 px-6 md:px-10 lg:px-16">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-lg">Built with ❤️ by Sagar</p>
                    <div className="mt-6 flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Github/>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <Twitter/>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}