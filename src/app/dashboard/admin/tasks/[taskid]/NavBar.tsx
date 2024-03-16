import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Image from "next/image";
import DeleteButton from "@/components/taskid/DeleteButton";
type Props = {
  task: string;
  deadline: Date;
  taskissue: Date;
  taskid: string;
};

function NavBar({ taskid, task, deadline, taskissue }: Props) {
  return (
    <div className="flex justify-between px-6">
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard/admin/tasks"}>
          {" "}
          <AiOutlineArrowLeft className="h-6 w-6" />
        </Link>
        <Image
          className="rounded-full"
          src="/teamLogo.png"
          alt="Logo"
          width={64}
          height={64}
        />
        <span className="text-primary font-bold">{task}</span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          {" "}
          <span className="text-primary/50 ">
            Added: {taskissue.toLocaleDateString()}
          </span>
          <span className="text-primary/50 ">
            Deadline: {deadline.toLocaleDateString()}
          </span>
        </div>
        <DeleteButton taskid={taskid} />
      </div>
    </div>
  );
}
export default NavBar;
