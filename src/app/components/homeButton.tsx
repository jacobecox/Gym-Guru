"use client";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className="font-extrabold text-xl bg-gradient-to-r from-red-400 via-yellow-500 to-red-400 bg-clip-text text-transparent p-8 flex justify-end"
    >
      GYM GURU
    </button>
  );
}
