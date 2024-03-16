import { UserButton } from "@clerk/nextjs";
import ToggleThemeBtn from "../ToggleThemeBtn";
import Image from "next/image";
type Props = {};
function HeaderDashboard({}: Props) {
  return (
    <header className="py-10 px-4 md:p-10 mx-auto flex items-center justify-between  w-full bg-base-200">
      <div className="flex items-center gap-3">
        <Image
          className="hidden md:block"
          src={`/logo.png`}
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl text-center text-primary">Brand Name</h1>
      </div>{" "}
      <UserButton />
    </header>
  );
}
export default HeaderDashboard;
