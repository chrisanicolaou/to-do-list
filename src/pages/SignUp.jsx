import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  const [user] = useUser();

  if (user) {
    const navigate = useNavigate();
    navigate("/home");
  }
  return (
    <div>
      <h1>Sign-Up</h1>
      <SignUpForm />
    </div>
  );
}
