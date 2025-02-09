import HomeButton from "@/app/components/homeButton";
import DarkModeToggle from "@/app/components/darkModeToggle";
import { AuthForm } from "@/app/components/authForm";

export default function Login() {
  return (
    <div>
      <div className="flex justify-between">
        <DarkModeToggle />
        <HomeButton />
      </div>
      <AuthForm type="login" />;
    </div>
  );
}
