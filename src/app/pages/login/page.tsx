import NavBar from "@/app/components/navBar";
import { AuthForm } from "@/app/components/authForm";

export default function Login() {
  return (
    <div>
      <NavBar />
      <AuthForm type="login" />;
    </div>
  );
}
