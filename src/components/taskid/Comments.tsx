"use client";

import fetchtaskComments, {
  TaskCommentsResponse,
} from "@/lib/frontend/fetchTaskComments";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type Props = {
  taskid: string;
  teamid: string;
};
function Comments({ taskid, teamid }: Props) {
  const comments = useQuery({
    queryKey: ["taskComments"],
    queryFn: async () => await fetchtaskComments({ taskid, teamid }),
  });
  comments.data as TaskCommentsResponse;
  if (comments.isLoading) {
    return <div>Loading...</div>;
  }
  if (comments.isError) {
    return <div>Error</div>;
  }
  const data = comments.data as TaskCommentsResponse[];
  return (
    <div className="flex-1 flex flex-col-reverse gap-2 mx-2 overflow-y-scroll">
      {data.map((comment) => {
        if (comment.isOwner) {
          return (
            <HoverCard key={comment.id}>
              <HoverCardTrigger>
                <div className="flex  justify-end gap-5 items-center">
                  <div>{comment.comment}</div>
                  <Image
                    className="rounded-full"
                    src={
                      comment.employee.photo
                        ? comment.employee.photo
                        : "/defaultProfile.png"
                    }
                    alt="Profile"
                    width={32}
                    height={32}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="end">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      className="rounded-full"
                      src={
                        comment.employee.photo
                          ? comment.employee.photo
                          : "/defaultProfile.png"
                      }
                      alt="Profile"
                      width={32}
                      height={32}
                    />
                    {comment.employee.firstName} {comment.employee.lastName}
                  </div>
                  <div>{comment.employee.email}</div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        }
        return (
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex  justify-start gap-5 items-center">
                <Image
                  className="rounded-full"
                  src={
                    comment.employee.photo
                      ? comment.employee.photo
                      : "/defaultProfile.png"
                  }
                  alt="Profile"
                  width={32}
                  height={32}
                />
                <div>{comment.comment}</div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full"
                    src={
                      comment.employee.photo
                        ? comment.employee.photo
                        : "/defaultProfile.png"
                    }
                    alt="Profile"
                    width={32}
                    height={32}
                  />
                  {comment.employee.firstName} {comment.employee.lastName}
                </div>
                <div>{comment.employee.email}</div>
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
export default Comments;
