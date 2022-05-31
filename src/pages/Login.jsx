import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import LoginForm from "../components/LoginForm";
import lightLogo from "../assets/logo-light.png";
import styles from "../App.module.css";
import { Transition } from "solid-transition-group";
import Logo from "../components/Logo";

export default function Login() {
  const [user] = useUser();
  const base = { opacity: 1 };
  const options = { duration: 1000 };
  const animateIn = (el) => {
    el.animate([{ opacity: 0 }, base], options);
  };

  if (user) {
    const navigate = useNavigate();
    navigate("/home");
  }
  return (
    <div style={styles.loginContainer}>
      <Transition onEnter={animateIn} appear={true}>
        <Logo />
      </Transition>
      <LoginForm />
    </div>
  );
}
