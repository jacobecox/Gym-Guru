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

  useEffect(() => {
    // Get the token from the query parameters
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
        <h1 className="text-center text-2xl text-black dark:text-white">
          Login successful
        </h1>
        <button onClick={handleClick} className="bg-yellow-400 text-black p-2">
          Back to home
        </button>
      </div>
    </>
  );
}
