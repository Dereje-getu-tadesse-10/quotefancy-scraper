import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-10 right-10">
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? <Sun size={17} /> : <Moon size={17} />}
      </Button>
    </div>
  );
};
