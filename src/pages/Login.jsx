import { useNavigate } from "solid-app-router";
import { useUser } from "../../utils/helpers";
import LoginForm from "../components/LoginForm";
import lightLogo from "../assets/logo-light.png";
import styles from "../App.module.css";

export default function Login() {
  const [user] = useUser();

  if (user) {
    const navigate = useNavigate();
    navigate("/home");
  }
  return (
    <div style={styles.loginContainer}>
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
      <LoginForm />
    </div>
  );
}
