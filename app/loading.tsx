
const loading = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full flex-col">
      <div
        className="animate-spin inline-block size-[5rem] border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default loading;
