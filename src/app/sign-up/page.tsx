import Header from "@/components/hero/Header";
import { SignUp } from "@clerk/nextjs";

type Props = {};
function page({}: Props) {
  return (
    <>
      <Header />
      <main className="flex-1 flex justify-center items-center p-10">
        <SignUp />
      </main>
    </>
  );
}
export default page;
