import { Prisma, TaskComments } from "@prisma/client";
import axios from "axios";
export const taskCommentsWith = Prisma.validator<Prisma.TaskCommentsArgs>()({
  include: {
    employee: {
      select: {
        firstName: true,
        lastName: true,
        photo: true,
        email: true,
      },
    },
  },
});
export type TaskCommentsWithProfile = Prisma.TaskCommentsGetPayload<
  typeof taskCommentsWith
>;

export interface TaskCommentsResponse extends TaskCommentsWithProfile {
  isOwner: boolean;
}

export default async function fetchtaskComments({
  teamid,
  taskid,
}: {
  teamid: string;
  taskid: string;
}) {
  try {
    const data = await axios.get(
      `/api/admin/tasks/taskcomments?teamid=${teamid}&taskid=${taskid}`
    );
    return data.data as TaskCommentsResponse[];
  } catch (error) {
    return error;
  }
}
