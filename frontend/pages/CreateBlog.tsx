import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from 'date-fns';
import { Upload, ImageIcon, Calendar, User, FileText, Eye, X, CheckCircle, Loader2 } from 'lucide-react';

export const CreateBlog = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [input, setInput] = useState({
    authorName: "",
    title: "",
    content: "",
    thumbnail: "",
    publishedDate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleDateChange = (e: any) => {
    const date = new Date(e.target.value);
    const formattedDate = format(date, 'MMM dd, yyyy');
    setInput((prevInput) => ({
      ...prevInput,
      publishedDate: formattedDate,
    }));
  };

  const validateImageFile = (file: any) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      toast.error(`Invalid file type. Please upload: ${validExtensions.join(', ').toUpperCase()}`);
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      event.target.value = ''; // Clear the input
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setPreviewImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "blog_upload_image");
      data.append("cloud_name", "sagarb2003");

      const res = await fetch("https://api.cloudinary.com/v1_1/sagarb2003/image/upload", {
        method: "POST",
        body: data
      });

      if (!res.ok) throw new Error('Upload failed');

      const uploadImageUrl = await res.json();
      setInput((prevInput) => ({
        ...prevInput,
        thumbnail: uploadImageUrl.secure_url,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      setPreviewImage("");
      event.target.value = '';
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setInput(prev => ({ ...prev, thumbnail: "" }));
    setPreviewImage("");
    // Reset file input
    const fileInput = document.getElementById('thumbnail');
    if (fileInput && fileInput instanceof HTMLInputElement) fileInput.value = '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!input.thumbnail) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://backend.sagarsinghbisht248.workers.dev/api/v1/blog/create",
        input,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Blog created successfully:", response.data);
      toast.success("Blog published successfully! 🎉");
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to publish blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Author Name */}
          <div className="space-y-2">
            <label htmlFor="authorName" className="flex items-center text-lg font-semibold text-gray-700">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              placeholder="Enter your name"
              value={input.authorName}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="flex items-center text-lg font-semibold text-gray-700">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter an engaging title"
              value={input.title}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label htmlFor="content" className="flex items-center text-lg font-semibold text-gray-700">
              <Eye className="w-5 h-5 mr-2 text-green-600" />
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your blog content here..."
              value={input.content}
              onChange={handleChange}
              rows={8}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 resize-vertical"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="flex items-center text-lg font-semibold text-gray-700">
              <ImageIcon className="w-5 h-5 mr-2 text-orange-600" />
              Thumbnail Image
            </label>

            {!previewImage ? (
              <div className="relative">
                <input
                  type="file"
                  id="thumbnail"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  required
                />
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition-all duration-200"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-2" />
                      <p className="text-orange-600 font-medium">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-orange-600 mb-2" />
                      <p className="text-orange-600 font-medium">Click to upload image</p>
                      <p className="text-orange-400 text-sm mt-1">JPG, PNG, GIF, WEBP (Max 5MB)</p>
                    </div>
                  )}
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border-2 border-orange-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-green-500 text-white rounded-full p-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Published Date */}
          <div className="space-y-2">
            <label htmlFor="publishedDate" className="flex items-center text-lg font-semibold text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Published Date
            </label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              onChange={handleDateChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200 text-gray-800"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || isUploading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Publishing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Publish Blog Post
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Writing Tips</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Use a compelling title that grabs attention</li>
            <li>• Break your content into paragraphs for better readability</li>
            <li>• Choose a high-quality thumbnail that represents your content</li>
            <li>• Proofread before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};