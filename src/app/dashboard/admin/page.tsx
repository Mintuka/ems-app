import { UserButton } from "@clerk/nextjs";

type Props = {};
function page({}: Props) {
  return (
    <div>
      <UserButton />
    </div>
  );
}
export default page;
