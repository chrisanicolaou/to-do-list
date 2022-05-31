import { useNavigate } from "solid-app-router";
import { Button, Form, FormText, InputGroup } from "solid-bootstrap";
import { createSignal, useContext } from "solid-js";
import { getReq } from "../../utils/api";
import { checkEmptyFields, setToUserStorage } from "../../utils/helpers";
import styles from "../App.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "solid-icons/ai";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [errors, setErrors] = createSignal({
    email: "",
    password: ""
  });
  const [password, setPassword] = createSignal("");
  const [isShowingPass, setIsShowingPass] = createSignal(false);
  const navigate = useNavigate();

  const onLoginPress = async (e) => {
    try {
      e.preventDefault();
      await checkEmptyFields({ email: email(), password: password() });
      const result = await getReq(`/login/${email()}/${password()}`);
      setToUserStorage(result);
      navigate("/home");
    } catch (err) {
      console.log(err);
      switch (err) {
        case "email":
          setErrors({ email: "Please enter an email address", password: "" });
          break;
        case "password":
          setErrors({ email: "", password: "Please enter a password" });
          break;
      }
    }
  };

  const onSignUpPress = () => {
    navigate("/signup");
  };

  const showHidePassword = () => {
    setIsShowingPass(!isShowingPass());
  };

  return (
    <div>
      <Form onSubmit={onLoginPress}>
        <Form.Group class="mb-3" controlId="emailInput">
          <Form.Label>Email address</Form.Label>
          <div style={styles.loginSignUpInputs}>
            <Form.Control
              placeholder="Enter your email"
              onBlur={(e) => setEmail(e.target.value)}
            />
          </div>
          <FormText class={styles.errorText}>
            {errors().email !== "" ? errors().email : null}
          </FormText>
        </Form.Group>
        <Form.Group class="mb-3" controlId="passwordInput">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={isShowingPass() ? "input" : "password"}
              placeholder="Enter your password"
              onBlur={(e) => setPassword(e.target.value)}
              style={{ "max-width": "75%" }}
            />
            <InputGroup.Text onClick={showHidePassword}>
              <>
                {isShowingPass() ? (
                  <AiOutlineEyeInvisible size={24} color="#000000" />
                ) : (
                  <AiOutlineEye size={24} color="#000000" />
                )}
              </>
            </InputGroup.Text>
          </InputGroup>
          <FormText class={styles.errorText}>
            {errors().password !== "" ? errors().password : null}
          </FormText>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Button variant="outline-secondary" size="sm" onClick={onSignUpPress}>
        Don't have an account? Create one
      </Button>
    </div>
  );
}
