export default function LoadingSpinner() {
  return (
    //displays loading spinner when data is loading on screen
    <div className="flex items-center justify-center p-8">
      <div className="border-solid bg-black dark:bg-yellow-400 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full border-8 border-t-8 border-white border-t-yellow-400 dark:border-t-black w-16 h-16 m-4"></div>
        <span className="text-xl font-bold text-yellow-400 dark:text-black  m-2">
          Loading...
        </span>
      </div>
    </div>
  );
}
