import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import LoginForm from "../components/LoginForm";
import lightLogo from "../assets/logo-light.png";
import styles from "../App.module.css";
import { Transition } from "solid-transition-group";

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
        <img
          src={lightLogo}
          height="375px"
          width="375px"
          style={{
            width: "95%",
            height: "200px",
            "object-fit": "none",
            paddingRight: "100px"
          }}
        />
      </Transition>
      <LoginForm />
    </div>
  );
}
