import NavBar from "@/app/components/navBar";
import { AuthForm } from "@/app/components/authForm";

export default function CreateAccount() {
  return (
    <div>
      <NavBar />
      <AuthForm type="createAccount" />;
    </div>
  );
}
