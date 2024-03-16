import ToggleThemeBtn from "../ToggleThemeBtn";
import Image from "next/image";

type Props = {};

function Header({}: Props) {
  return (
    <header className="p-10 mx-auto flex items-center justify-between max-w-7xl w-full">
      <div className="flex items-center gap-3">
        <Image src={`/logo.png`} alt="logo" width={50} height={50} />
        <h1 className="text-lg md:text-3xl text-center text-primary">
          Brand Name
        </h1>
      </div>{" "}
      <ToggleThemeBtn />
    </header>
  );
}
export default Header;
