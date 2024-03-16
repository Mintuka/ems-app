import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Props = {};
function LoadingTeam({}: Props) {
  return (
    <div className="flex pl-20 px-12 gap-10">
      <div className="flex flex-col flex-1 gap-8">
        <h2 className="text-lg uppercase text-primary/50">Team Members</h2>
        <ul className="flex flex-col w-full gap-5">
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
        </ul>
        <Button className="w-2/3 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1">
          Team Member
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <h2 className="text-lg uppercase text-primary/50">Tasks</h2>

        <ul className="flex flex-col w-full gap-5">
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
          <li>
            <Skeleton className="w-2/3 h-8 rounded-xl" />
          </li>
        </ul>

        <Button className="w-2/3 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1">
          Add Task
        </Button>
      </div>
    </div>
  );
}
export default LoadingTeam;
