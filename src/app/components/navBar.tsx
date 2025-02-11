"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUser, logout } from "../store/slices/authenticate";

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

  const dispatch = useDispatch<AppDispatch>();
  const authenticated = useSelector(
    (state: RootState) => state.authenticate.authenticated
  );
  const username = useSelector(
    (state: RootState) => state.authenticate.username
  );

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUser());
    }
  }, [authenticated, username, dispatch]);

  const login = () => {
    router.push("/pages/login");
  };

  const createAccount = () => {
    router.push("/pages/create-account");
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    router.push("/");
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <div className="flex justify-end items-center absolute top-5 right-10">
          <h1 className="dark:text-yellow-400 text-black font-extrabold px-6">
            {username}
          </h1>
          <button
            onClick={handleLogoutClick}
            className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
          >
            Logout
          </button>
        </div>
      );
    } else if (
      pathName !== "/pages/login" &&
      pathName !== "/pages/create-account"
    ) {
      return (
        <>
          <div className="flex justify-end pt-2 px-6 absolute top-5 left-0 right-0">
            <button
              onClick={login}
              className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
            >
              Login
            </button>
          </div>
          <div className="flex justify-end pt-2 px-6 absolute top-16 left-0 right-0">
            <button
              onClick={createAccount}
              className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black text-2xl shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
            >
              Create Account
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex">
      <div className="flex justify-start items-center absolute top-5 left-10">
        {/* Dark mode toggle */}
        <p className="text-black dark:text-white font-bold px-2">Mode</p>
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
      <div>{renderLinks()}</div>
      {/* Home Button */}
      {pathName !== "/" && ( // Not displayed on home page
        <div className="flex justify-start items-center absolute top-5 left-52">
          <button
            onClick={handleClick}
            className="font-extrabold text-xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent flex justify-start"
          >
            GYM GURU
          </button>
        </div>
      )}
    </div>
  );
}
