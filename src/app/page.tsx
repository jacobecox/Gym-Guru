export default function App() {
  return (
    <main>
      <div>
        <h1 className="text-center font-extrabold text-8xl pt-10">GYM GURU</h1>
        <p className="text-center font-bold text-xl p-2 text-yellow-500">
          Your ultimate gym trainer
        </p>
      </div>
      <div className="flex flex-col space-y-4 items-stretch justify-center max-w-lg mx-auto w-full py-4">
        <button className="text-center bg-white border-2 text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400">
          Explore Exercises
        </button>
        <button className="text-center bg-white border-2 text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400">
          Saved Exercises
        </button>
        <button className="text-center bg-white border-2 text-black text-5xl shadow-lg rounded-md p-8 gap-4 hover:bg-yellow-400">
          My Workout Plan
        </button>
      </div>
    </main>
  );
}
