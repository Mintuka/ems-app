import Image from "next/image";
import { SignInButton, UserButton, auth, currentUser } from "@clerk/nextjs";
import ToggleThemeBtn from "../components/ToggleThemeBtn";
import Header from "@/components/hero/Header";
import { SignIn } from "@clerk/nextjs";
import DashboardBox from "@/components/hero/DashboardBox";
import SignInBox from "@/components/hero/SignInBox";

import Triage from "@/components/hero/Triage";
export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center md:flex-row justify-center py-10 px-2 md:py-24 bg-base-100 text-primary h-full">
        <div className="grid md:grid-cols-2 justify-center  max-w-6xl join flex-grow">
          <div className="flex flex-col justify-center item   w-full   gap-10 p-6 bg-base-300 md:join-item ">
            <div className="flex items-center justify-center gap-3">
              <Image src={`/logo.png`} alt="logo" width={50} height={50} />
              <h1 className="text-3xl text-center text-primary">Brand Name</h1>
            </div>{" "}
            <p className="mx-2 md:text-lg antialiased tracking-wider">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              recusandae asperiores cum maiores deserunt magnam ullam?
              Exercitationem veniam, repudiandae ut fugiat dolores perferendis
              ex minima, quis, expedita omnis fuga corporis!
            </p>
            <Triage user={user} />
          </div>{" "}
          <Image
            className="hidden md:block flex-auto join-item"
            src={"/hero1.jpg"}
            width={700}
            height={1000}
            alt="hero"
          />
        </div>
      </main>
    </>
  );
}
