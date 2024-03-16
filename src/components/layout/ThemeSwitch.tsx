"use client";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { BsFillSunFill } from "react-icons/bs";

type Props = {};
function ThemeSwitch({}: Props) {
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
    <div
      className="flex justify-center md:justify-start"
      onClick={() => {
        if (theme === "dark") {
          localStorage.setItem("theme", "light");
          setTheme("light");
        } else {
          localStorage.setItem("theme", "dark");
          setTheme("dark");
        }
      }}
    >
      {theme === "dark" ? (
        <>
          {" "}
          <CiDark className="h-5 w-5 font-bold" />{" "}
          <span className="hidden md:block">Dark</span>
        </>
      ) : (
        <>
          <BsFillSunFill className="h-5 w-5 font-bold" />
          <span className="hidden md:block">Light</span>
        </>
      )}
    </div>
  );
}
export default ThemeSwitch;
