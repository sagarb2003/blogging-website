export const Skeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse fixed inset-0 flex items-center justify-center bg-gray-100 z-50"
    >
      <div>
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4" />
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5" />
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
