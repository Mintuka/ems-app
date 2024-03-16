import NavBar from "./NavBar";
import prismaClient from "@/lib/prisma/prisma";
import Team from "./Team";
import Canvas from "@/components/Dashboard/Canvas";

type Props = {
  params: {
    teamid: string;
  };
};
async function getTeamData(teamid: string) {
  try {
    const data = await prismaClient.teams.findUniqueOrThrow({
      where: {
        id: teamid,
      },
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
        TeamTask: {
          orderBy: [{ done: "asc" }, { deadline: "asc" }],
        },
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

async function page({ params }: Props) {
  // await delay();
  const teamData = await getTeamData(params.teamid);
  if (!teamData) {
    throw new Error("Team not found");
  }
  return (
    <Canvas>
      <NavBar
        created={teamData.createdAt}
        teamName={teamData.name}
        teamId={teamData.id}
      />
      <hr />
      <Team teamData={teamData} />
    </Canvas>
  );
}
export default page;
