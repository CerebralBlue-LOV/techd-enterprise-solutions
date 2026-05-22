import { Moon, Sun } from "lucide-react";
import { Button } from "@ui/button";
import { useDarkMode } from "@hooks/use-dark-mode";

type Props = {
  className?: string;
};

export const DarkModeToggle = ({ className }: Props) => {
  const { isDark, toggle } = useDarkMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default DarkModeToggle;
