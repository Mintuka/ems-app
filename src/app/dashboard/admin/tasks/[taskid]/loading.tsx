import Canvas from "@/components/Dashboard/Canvas";
import LoadingNavBar from "@/components/Loading/LoadingNavBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};
function loading({}: Props) {
  return (
    <Canvas>
      <LoadingNavBar />
      <div className="flex  px-12 gap-16  flex-1">
        <div className="flex flex-col flex-1 gap-8 items-center">
          <h2 className="text-lg uppercase text-primary/50 w-full flex justify-center">
            <Skeleton className="w-full h-8 rounded-xl" />
          </h2>
          <div className="w-full flex justify-center">
            <Skeleton className="w-full h-8 rounded-xl" />
          </div>
          <div className="flex flex-col gap-3 w-full items-center">
            <h3 className="text-lg uppercase text-primary/50 w-full text-center">
              Description
            </h3>
            <Skeleton className=" w-full h-52 rounded-xl" />
          </div>
          <div className="flex  gap-3 w-full">
            <Button
              disabled
              className="flex-1 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1"
            >
              Finish Task
            </Button>{" "}
            <Button
              disabled
              className="flex-1 bg-base-100 border border-primary text-primary  rounded-xl hover:bg-primary hover:text-base-100 active:translate-y-1"
            >
              Change Task
            </Button>{" "}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-8 items-center my-10">
          <h2 className="text-lg uppercase text-primary/50 w-full text-center">
            Comments
          </h2>
          <div className="flex flex-1  gap-3  flex-col-reverse w-full items-center">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </Canvas>
  );
}
export default loading;
