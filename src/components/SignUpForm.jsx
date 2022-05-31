import { useNavigate } from "solid-app-router";
import { Button, Form, FormText, InputGroup } from "solid-bootstrap";
import { createSignal, useContext } from "solid-js";
import { postReq } from "../../utils/api";
import styles from "../App.module.css";
import { checkEmptyFields, setToUserStorage } from "../../utils/helpers";
import { AiOutlineEye, AiOutlineEyeInvisible } from "solid-icons/ai";

export default function SignUpForm() {
  const [email, setEmail] = createSignal("");
  const [emailErr, setEmailErr] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPass, setConfirmPass] = createSignal("");
  const [isShowingPass, setIsShowingPass] = createSignal(false);
  const [isShowingConfirmPass, setIsShowingConfirmPass] = createSignal(false);
  const [errors, setErrors] = createSignal({
    emailErr: "",
    passwordErr: "",
    confirmPassErr: ""
  });
  const navigate = useNavigate();

  const onSignUpPress = async (e) => {
    try {
      e.preventDefault();
      await checkEmptyFields({
        email: email(),
        password: password(),
        confirmPass: confirmPass()
      });
      const result = await postReq(`/signup`, {
        email: email(),
        password: password()
      });
      setToUserStorage(result);
      navigate("/home");
    } catch (err) {
      console.log(err);
      switch (err) {
        case "email":
          setErrors({
            emailErr: "Please enter an email",
            passwordErr: "",
            confirmPassErr: ""
          });
          break;
        case "password":
          setErrors({
            emailErr: "",
            passwordErr: "Please enter a password",
            confirmPassErr: ""
          });
          break;
        case "confirmPass":
          setErrors({
            emailErr: "",
            passwordErr: "",
            confirmPassErr: "Please repeat your password"
          });
          break;
      }
    }
  };

  const returnToLoginPress = () => {
    navigate("/");
  };

  const showHidePassword = () => {
    setIsShowingPass(!isShowingPass());
  };

  const showHideConfirmPass = () => {
    setIsShowingConfirmPass(!isShowingConfirmPass());
  };

  return (
    <div>
      <Form onSubmit={onSignUpPress}>
        <Form.Group class="mb-3" controlId="emailInput">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Enter your email"
            onBlur={(e) => setEmail(e.target.value)}
          />
          <FormText class={styles.errorText}>
            {errors().emailErr !== "" ? errors().emailErr : null}
          </FormText>
        </Form.Group>
        <Form.Group class="mb-3" controlId="passwordInput">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={isShowingPass() ? "input" : "password"}
              placeholder="Enter your password"
              onBlur={(e) => setPassword(e.target.value)}
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
            {errors().passwordErr !== "" ? errors().passwordErr : null}
          </FormText>
        </Form.Group>
        <Form.Group class="mb-3" controlId="repeatPasswordInput">
          <InputGroup>
            <Form.Control
              type={isShowingConfirmPass() ? "input" : "password"}
              placeholder="Confirm password"
              onBlur={(e) => setConfirmPass(e.target.value)}
            />
            <InputGroup.Text onClick={showHideConfirmPass}>
              <>
                {isShowingConfirmPass() ? (
                  <AiOutlineEyeInvisible size={24} color="#000000" />
                ) : (
                  <AiOutlineEye size={24} color="#000000" />
                )}
              </>
            </InputGroup.Text>
          </InputGroup>
          <FormText class={styles.errorText}>
            {errors().confirmPassErr !== "" ? errors().confirmPassErr : null}
          </FormText>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign-Up
        </Button>
      </Form>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={returnToLoginPress}
      >
        Have an account? Login
      </Button>
    </div>
    // <div>
    //   <form onSubmit={onSignUpPress}>
    //     <label for="email">Email</label>
    //     <input
    //       type="text"
    //       id="email"
    //       onBlur={(e) => setEmail(e.target.value)}
    //       value={email()}
    //     />
    //     <label for="password">Password</label>
    //     <input
    //       type="text"
    //       id="password"
    //       onBlur={(e) => setPassword(e.target.value)}
    //       value={password()}
    //     />
    //     <label for="password">Confirm Password</label>
    //     <input
    //       type="text"
    //       id="password"
    //       onBlur={(e) => setConfirmPass(e.target.value)}
    //       value={confirmPass()}
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    //   <button onClick={returnToLoginPress}>Return to Login</button>
    // </div>
  );
}
