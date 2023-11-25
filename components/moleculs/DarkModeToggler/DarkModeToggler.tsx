import { Moon, SunIcon } from "lucide-react";
import React from "react";
import { useDarkMode } from "usehooks-ts";

export default function DarkModeToggler() {
  const { toggle, isDarkMode } = useDarkMode();
  return (
    <button
      type="submit"
      onClick={(e) => {
        toggle();
      }}
    >
      {isDarkMode ? <SunIcon /> : <Moon />}
    </button>
  );
}
