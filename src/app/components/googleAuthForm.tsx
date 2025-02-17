/* eslint-disable @next/next/no-img-element */
"use client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function GoogleAuthForm() {
  const handleGoogleLogin = () => {
    console.log("Redirecting to:", `${BASE_URL}/auth/google`);
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="dark:bg-white dark:text-blue-500 border-4 dark:border-none border-blue-500 p-2 text-lg rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white  transition flex items-center"
    >
      Continue with Google
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Workout Animation"
        className="rounded-md object-fill m-1"
      />
    </button>
  );
}
