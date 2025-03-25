"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUser, logout } from "../store/slices/authenticate";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";

export default function NavBar() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setIsMounted(true);
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    router.push("/");
  };

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { authenticated, username } = useSelector(
    (state: RootState) => state.authenticate
  );

  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  useEffect(() => {
    setIsAuthenticated(authenticated);
  }, [authenticated]);

  useEffect(() => {
    if (token && authenticated) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        if (!decoded.exp || decoded.exp * 1000 < Date.now()) {
          // If 'exp' is missing or expired, log out
          dispatch(logout());
        } else {
          dispatch(fetchUser());
        }
      } catch (error) {
        console.error("Invalid token", error);
        dispatch(logout());
      }
    }
  }, [dispatch, authenticated, token]);

  const handleLogin = () => {
    router.push("/pages/login");
  };

  const handleCreateAccount = () => {
    router.push("/pages/create-account");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const renderLinks = () => {
    if (!isClient) return null;
    if (isAuthenticated && isMounted) {
      return (
        <div className="flex justify-end items-center absolute top-6 right-10">
          <h1 className="dark:text-yellow-400 text-black font-extrabold px-6">
            {username}
          </h1>
          <button
            onClick={handleLogout}
            className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black md:text-2xl text-lg shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white transition"
          >
            Logout
          </button>
        </div>
      );
    } else if (
      pathName !== "/pages/login" &&
      pathName !== "/pages/create-account" &&
      pathName !== "/pages/login-success"
    ) {
      return (
        <>
          <div className="flex justify-end items-center pt-2 px-6 absolute top-5 left-0 right-0 z-0">
            <button
              onClick={handleLogin}
              className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black md:text-2xl text-lg shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white transition"
            >
              Login
            </button>
          </div>
          <div className="flex justify-end items-center pt-2 px-6 absolute top-16 left-0 right-0">
            <button
              onClick={handleCreateAccount}
              className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black md:text-2xl text-lg shadow-lg rounded-md px-4 hover:bg-yellow-300 hover:text-white dark:hover:bg-white transition"
            >
              Create Account
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-start pt-5 px-4 z-10">
        {/* Dark mode toggle */}
        <p className="text-black dark:text-white font-bold px-2">Mode</p>
        <button
          className="relative w-16 h-8 bg-black dark:bg-yellow-400 rounded-full cursor-pointer flex items-center"
          onClick={toggleTheme}
        >
          <div
            className={`absolute w-6 h-6 bg-yellow-400 dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
              theme === "dark" ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <div>{renderLinks()}</div>
      {/* Home Button */}
      {pathName !== "/" && (
        <div className="flex justify-normal items-center pt-4 px-4">
          <button
            onClick={handleClick}
            className="font-extrabold text-xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent flex justify-start z-10"
          >
            GYM GURUS
          </button>
        </div>
      )}
    </div>
  );
}
