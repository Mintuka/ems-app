import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Image from "next/image";
type Props = {
  created: Date;
  teamName: string;
  teamId: string;
};

function NavBar({ created, teamId, teamName }: Props) {
  return (
    <div className="flex justify-between px-6">
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/admin/teams"}>
          {" "}
          <AiOutlineArrowLeft className="h-6 w-6" />
        </Link>
        <Image src="/teamLogo.png" alt="Logo" width={64} height={64} />
        <span className="text-primary font-bold">{teamName}</span>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-primary/50 ">
          Added: {created.toDateString()}
        </span>

        <Button className="bg-error/20 text-error font-bold hover:bg-error hover:text-base-100 flex gap-3">
          <BsFillTrash3Fill /> <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}
export default NavBar;
