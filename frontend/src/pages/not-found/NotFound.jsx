const NotFound = () => {
  return (
    <div className="border border-red-400 bg-red-100 text-red-700 px-4 py-3 rounded relative max-w-lg mx-auto">
      <strong className="font-bold block">Error</strong>
      <span className="block">Resource not found.</span>
    </div>
  );
};

export default NotFound;