import { useNavigate } from "solid-app-router";
import { useUser } from "../src/components/UserContext";

export const redirect = () => {
  const navigation = useNavigate();
  const [user] = useUser();

  if (!user()) {
    navigation("/");
  }
};
