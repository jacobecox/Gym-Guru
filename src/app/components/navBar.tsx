"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const [theme, setTheme] = useState("light");

  // Listens to change in theme state (above)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"; // Grabs current theme in local storage else uses light theme
    setTheme(savedTheme); // Sets state to that theme
    document.documentElement.classList.toggle("dark", savedTheme === "dark"); // If current theme is set to dark, switches to dark
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Checks theme to see if it equals current theme
    setTheme(newTheme); // Sets theme to new theme selected
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Persist theme into local storage to be saved
  };

  const pathName = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-between">
      <div className="flex justify-start items-center p-4">
        {/* Dark mode toggle */}
        <p className="text-black dark:text-white font-bold p-2">Mode</p>
        <div
          className="relative w-16 h-8 bg-black dark:bg-yellow-400 rounded-full cursor-pointer flex items-center"
          onClick={toggleTheme}
        >
          <div
            className={`absolute w-6 h-6 bg-yellow-400 dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
              theme === "dark" ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </div>
      </div>
      {/* Home Button */}
      {pathName !== "/" && ( // Not displayed on home page
        <button
          onClick={handleClick}
          className="font-extrabold text-xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent p-8 flex justify-end"
        >
          GYM GURU
        </button>
      )}
    </div>
  );
}
