"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { fetchUser } from "@/app/store/slices/authenticate";

export default function LoginSuccess() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div className="flex justify-center items-center">
      <p>Login Successful</p>
      <button onClick={handleClick} className="bg-yellow-400 text-black">
        Back to home
      </button>
    </div>
  );
}
