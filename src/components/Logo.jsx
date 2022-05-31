import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";
import { useDark } from "./DarkContext";

export default function Logo() {
  const [dark, setDark] = useDark();
  return (
    <img
      src={dark() ? darkLogo : lightLogo}
      height="375px"
      width="375px"
      style={{
        width: "95%",
        height: "200px",
        "object-fit": "none",
        paddingRight: "100px"
      }}
    />
  );
}
