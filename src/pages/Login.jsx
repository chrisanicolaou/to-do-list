import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const [user] = useUser();

  if (user) {
    const navigate = useNavigate();
    navigate("/home");
  }
  return (
    <div>
      <h1>To-Do</h1>
      <LoginForm />
    </div>
  );
}
