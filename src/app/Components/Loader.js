const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <p>Loading...</p>
    </div>
  );
};
export default Loader;
