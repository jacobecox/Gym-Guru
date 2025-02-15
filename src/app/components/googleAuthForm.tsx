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
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      Continue with Google
    </button>
  );
}
