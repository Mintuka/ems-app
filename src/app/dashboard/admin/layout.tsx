import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";
import { redirect } from "next/navigation";
import getRole from "@/lib/frontend/getRole";
import Nav from "@/components/layout/nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiMail } from "react-icons/fi";
import Loading from "./loading";
type Props = {
  children: ReactNode;
};

async function layout({ children }: Props) {
  const { userId } = auth();
  console.log(userId)
  // const role = await getRole(userId!);
  // if (role !== "admin") {
  //   redirect("/");
  // }
  return (
    <div className="flex-1 flex  bg-base-200">
      <Nav />
      <main className="flex-1 flex flex-col">
        {/* <HeaderDashboard /> */}
        <div className="relative flex-1 flex">
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Sheet>
            <SheetTrigger className=" absolute  bottom-4 right-4 z-20">
              <div className="p-4 bg-base-100/90  rounded-full hover:bg-base-300/90 active:translate-x-1">
                <FiMail className="w-12 h-12" />
              </div>
            </SheetTrigger>
            <SheetContent className="bg-base-100/80">
              <SheetHeader>
                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </main>
    </div>
  );
}
export default layout;
