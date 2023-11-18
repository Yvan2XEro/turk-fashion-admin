import { Button } from "@/components/ui/button";
import { Moon, SunIcon } from "lucide-react";
import React from "react";
import { useDarkMode } from "usehooks-ts";

export default function DarkModeToggler() {
  const { toggle, isDarkMode } = useDarkMode();
  return (
    <Button
      type="submit"
      onClick={(e) => {
        toggle();
      }}
      variant="ghost"
    >
      {isDarkMode ? <SunIcon /> : <Moon />}
    </Button>
  );
}
