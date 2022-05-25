import { useNavigate } from "solid-app-router";
import { createSignal, useContext } from "solid-js";
import { getReq } from "../../utils/api";
import { useUser } from "./UserContext";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [user, setUser] = useUser();
  const navigate = useNavigate();

  const onLoginPress = async (e) => {
    try {
      e.preventDefault();
      console.log("Trying");
      const result = await getReq(`/login/${email()}/${password()}`);
      console.log(result);
      setUser(result);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onLoginPress}>
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        onBlur={(e) => setEmail(e.target.value)}
        value={email()}
      />
      <label for="password">Password</label>
      <input
        type="text"
        id="password"
        onBlur={(e) => setPassword(e.target.value)}
        value={password()}
      />
      <button>Submit</button>
    </form>
  );
}
