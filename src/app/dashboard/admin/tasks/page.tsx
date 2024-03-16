import Canvas from "@/components/Dashboard/Canvas";
import SearchTasks from "@/components/tasks/SearchTask";
import Table from "@/components/tasks/Tabletasks";

type Props = {};
function page({}: Props) {
  return (
    <div className="flex flex-col text-primary bg-base-200 flex-1 p-4 gap-4">
      <SearchTasks />
      <Table />
    </div>
  );
}
export default page;
