import { Toaster } from "react-hot-toast";

export const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: "bg-gray-800 text-white",
        duration: 5000,
        success: {
          duration: 3000,
          className: "bg-white-500 text-black", 
        },
        error: {
          duration: 3000,
          className: "bg-white-500 text-red", 
        },
      }}
    />
  );
};


