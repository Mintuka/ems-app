import AddEmployerBtn from "@/components/teamsID/AddEmployerBtn";
import AddTaskBtn from "@/components/teamsID/AddTaskBtn";
import WarningDialogRemove from "@/components/teamsID/WarningDialogRemove";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { IoIosRemoveCircle } from "react-icons/io";
import { Prisma } from "@prisma/client";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";
import { HiPencil } from "react-icons/hi";
import ToggleTaskComplete from "@/components/teamsID/ToggleTaskComplete";
import AlertDialogRemoveTask from "@/components/teamsID/AlertDialogRemoveTask";
import EditTaskModal from "@/components/teamsID/EditTaskModal";

const teamWith = Prisma.validator<Prisma.TeamsArgs>()({
  include: {
    members: {
      select: {
        firstName: true,
        lastName: true,
        email: true,
        id: true,
        position: true,
      },
    },
    TeamTask: true,
  },
});
type TeamWith = Prisma.TeamsGetPayload<typeof teamWith>;
type Props = {
  teamData: TeamWith;
};
function Team({ teamData }: Props) {
  return (
    <div className="flex pl-20 px-12 gap-20">
      <div className="flex flex-col flex-1 gap-8">
        <h2 className="text-lg uppercase text-primary/50">Team Members</h2>
        <ul className="flex flex-col w-full gap-5 overflow-y-scroll max-h-72">
          <li className="grid grid-cols-4 items-center px-4  w-full">
            <span>Name</span>
            <span>Email</span>
            <span>Position</span>{" "}
            <span className=" justify-self-end">Actions</span>
          </li>
          <hr />
          {teamData.members.length > 0 ? (
            teamData.members.map((member) => {
              return (
                <li
                  key={member.id}
                  className="grid grid-cols-4 items-center  w-full hover:bg-primary/10 rounded-xl px-4 py-2"
                >
                  <span className="truncate">
                    {member.firstName} {member.lastName}
                  </span>
                  <span className=" truncate">{member.email}</span>
                  <span>{member.position}</span>
                  <span className=" justify-self-end">
                    <WarningDialogRemove id={member.id} />
                  </span>
                </li>
              );
            })
          ) : (
            <li className=" px-4">No members</li>
          )}
        </ul>
        <AddEmployerBtn id={teamData.id} />
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <h2 className="text-lg uppercase text-primary/50">Tasks</h2>

        <ul className="flex flex-col w-full gap-5 overflow-y-scroll max-h-72">
          <li className="grid grid-cols-4 gap-2 items-center px-4  w-full">
            <span>Task</span>
            <span>Due Data</span>
            <span>Status</span>
            <span className=" justify-self-end ">Actions</span>
          </li>
          <hr />
          {teamData.TeamTask.length > 0 ? (
            teamData.TeamTask.map((task) => {
              return (
                <li
                  key={task.id}
                  className="grid grid-cols-4 gap-2 justify-between w-full hover:bg-primary/10 rounded-xl px-4 py-2"
                >
                  <span className=" truncate">{task.task}</span>
                  <span>{task.deadline.toDateString()} </span>
                  <span>{task.done ? "Done" : "Ongoing"}</span>
                  {/* PlaceHolder */}
                  <span className=" justify-self-end flex gap-2">
                    <ToggleTaskComplete taskid={task.id} />
                    <EditTaskModal teamTask={task} />
                    <AlertDialogRemoveTask taskid={task.id} />
                  </span>
                </li>
              );
            })
          ) : (
            <li className=" px-4">No tasks</li>
          )}
        </ul>

        <AddTaskBtn id={teamData.id} />
      </div>
    </div>
  );
}
export default Team;
