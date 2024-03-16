"use client";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

type Props = {};
function ToggleThemeBtn({}: Props) {
  let test: any;
  if (typeof window !== "undefined") {
    test = document.querySelector("html");
  }
  const [theme, setTheme] = useState<string | null>();
  useEffect(() => {
    let value;
    value = localStorage.getItem("theme");
    test?.setAttribute("data-theme", value ? value : "light");
    setTheme(value);
  }, [theme]);
  return (
    <input
      checked={theme === "dark" ? true : false}
      onChange={() => {
        if (theme === "dark") {
          localStorage.setItem("theme", "light");
          setTheme("light");
        } else {
          localStorage.setItem("theme", "dark");
          setTheme("dark");
        }
      }}
      type="checkbox"
      className="toggle toggle-primary"
    />
  );
}
export default ToggleThemeBtn;
