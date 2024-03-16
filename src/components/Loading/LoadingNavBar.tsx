import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { Button } from "../ui/button";

type Props = {};
function LoadingNavBar({}: Props) {
  return (
    <div className="flex justify-between px-6">
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/admin/teams"}>
          {" "}
          <AiOutlineArrowLeft className="h-6 w-6" />
        </Link>
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-60 h-7 rounded-2xl" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-40 h-5 rounded-2xl" />

        <Button className="bg-error/20 text-error font-bold hover:bg-error hover:text-base-100 flex gap-3">
          <BsFillTrash3Fill /> <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}
export default LoadingNavBar;
