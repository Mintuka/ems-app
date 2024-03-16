import { User } from "@clerk/nextjs/dist/types/server";
import { use } from "react";
import SignInBox from "./SignInBox";
import DashboardBox from "./DashboardBox";

type Props = {
  user: User | null;
};
function Triage({ user }: Props) {
  console.log();
  if (!user) return <SignInBox />;
  if (
    user.privateMetadata.role === "guest" ||
    user.privateMetadata.role === undefined
  ) {
    return <div>not yet</div>;
  }
  return <DashboardBox user={user} />;
}
export default Triage;
