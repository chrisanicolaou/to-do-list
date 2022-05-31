import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import Logo from "../components/Logo";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  const [user] = useUser();

  if (user) {
    const navigate = useNavigate();
    navigate("/home");
  }

  return (
    <div>
      <Logo />
      <SignUpForm />
    </div>
  );
}
