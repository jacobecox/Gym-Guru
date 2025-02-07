import HomeButton from "@/app/components/homeButton";
import DarkModeToggle from "@/app/components/darkModeToggle";

export default function Login() {
  return (
    <div>
      <div className="flex justify-between">
        <DarkModeToggle />
        <HomeButton />
      </div>
      <p className="text-white text-center p-8">Login Here</p>
    </div>
  );
}
