import { Github } from "lucide-react";
import { ThemeSwitch } from "./theme-switch";
import { buttonVariants } from "./ui/button";

export const Header = () => (
  <header className="h-20 py-4 flex justify-end items-center">
    <div className="flex gap-1">
      <GHLink />
      <ThemeSwitch />
    </div>
  </header>
);

const GHLink = () => (
  <a
    href="https://github.com/Dereje-getu-tadesse-10/quotefancy-scraper"
    target="_blank"
    className={buttonVariants({
      variant: "ghost",
      size: "icon",
      className: "cursor-pointer",
    })}
  >
    <Github size={16} />
  </a>
);
