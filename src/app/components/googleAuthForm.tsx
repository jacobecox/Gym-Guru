"use client";

export default function GoogleAuthForm() {
  const handleGoogleAuth = () => {
    const authUrl = "http://localhost:8080/auth/google";
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Open the Google Auth route in a new popup window
    const authWindow = window.open(
      authUrl,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    const checkPopupClosed = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(checkPopupClosed);
        window.location.reload(); // Refresh the page to check login state
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
    >
      Continue with Google
    </button>
  );
}
