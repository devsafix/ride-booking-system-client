import { useContext, useEffect, useState } from "react";
import { ThemeProviderContext } from "@/context/theme.context";
import blackLogo from "../images/black-ridaa-logo.webp";
import whiteLogo from "../images/white-ridaa-logo.webp";

export default function Logo() {
  const { theme } = useContext(ThemeProviderContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      // Check system color scheme
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkQuery.matches);

      // Update if system theme changes
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      darkQuery.addEventListener("change", handleChange);

      return () => darkQuery.removeEventListener("change", handleChange);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);

  return (
    <div>
      <img
        src={isDarkMode ? whiteLogo : blackLogo}
        alt="logo"
        className="h-7"
        loading="lazy"
      />
    </div>
  );
}
