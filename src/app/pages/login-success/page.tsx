"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { fetchUser } from "@/app/store/slices/authenticate";
import NavBar from "@/app/components/navBar";

export default function LoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(fetchUser());
    router.push("/");
  };

  // When page loads, this useEffect is called to get token data in params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-6xl text-black dark:text-white p-8">
          Login successful
        </h1>
        <button
          onClick={handleClick}
          className="text-right bg-yellow-400 text-black dark:bg-yellow-400 dark:text-black md:text-2xl text-lg shadow-lg rounded-md px-4 p-2 hover:bg-yellow-300 hover:text-white dark:hover:bg-white"
        >
          Back to home
        </button>
      </div>
    </>
  );
}
