import Guest from "@/components/hero/Guest";
import getRole from "@/lib/frontend/getRole";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
type Props = {};

async function page({}: Props) {
  const { userId } = auth();
  const role = await getRole(userId!);
  if (role === "admin") {
    redirect("/dashboard/admin");
  }
  if (role === "user") {
    redirect("/dashboard/user");
  }
  if (role === "guest" || role === null) {
    redirect("/dashboard/admin");
  }

  return <div>page</div>;
}
export default page;
