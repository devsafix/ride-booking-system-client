import { useContext } from "react";
import { ThemeProviderContext } from "@/context/theme.context";
import blackLogo from "../images/black-ridaa-logo.webp";
import whiteLogo from "../images/white-ridaa-logo.webp";

export default function Logo() {
  const { theme } = useContext(ThemeProviderContext);

  return (
    <div>
      <img
        src={theme === "dark" || theme === "system" ? whiteLogo : blackLogo}
        alt="logo"
        className="h-7"
        loading="lazy"
      />
    </div>
  );
}
