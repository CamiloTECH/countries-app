"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui";
import { FC } from "react";

const Header: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Where in the world?</h1>

        <Button
          size="sm"
          variant={"ghost"}
          className="gap-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
