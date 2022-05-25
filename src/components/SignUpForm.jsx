import { useNavigate } from "solid-app-router";
import { createSignal, useContext } from "solid-js";
import { postReq } from "../../utils/api";
import { useUser } from "./UserContext";

export default function SignUpForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPass, setConfirmPass] = createSignal("");
  const [setUser] = useUser();
  const navigate = useNavigate();

  const onSignUpPress = async (e) => {
    try {
      e.preventDefault();
      const result = await postReq(`/signup`, {
        email: email(),
        password: password()
      });
      console.log(result);
      setUser(result);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const returnToLoginPress = () => {
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={onSignUpPress}>
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
        <label for="password">Confirm Password</label>
        <input
          type="text"
          id="password"
          onBlur={(e) => setConfirmPass(e.target.value)}
          value={confirmPass()}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={returnToLoginPress}>Return to Login</button>
    </div>
  );
}
