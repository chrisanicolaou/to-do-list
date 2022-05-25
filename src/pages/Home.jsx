//
//
//
import { createEffect, useContext } from "solid-js";
import { UserContext } from "../components/UserContext";

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  createEffect(() => {
    console.log(user());
  });
  return (
    <div>
      <h1>I'm on the homepage!</h1>
      <p>{user().email}</p>
    </div>
  );
}
