import Header from "@/components/hero/Header";
import { SignIn } from "@clerk/nextjs";

type Props = {};
function page({}: Props) {
  return (
    <>
      <Header />
      <main className="flex-1 flex justify-center items-center">
        <SignIn />
      </main>
    </>
  );
}
export default page;
