import SearchTime from "@/components/timetracking/SearchTime";
import TableTime from "@/components/timetracking/TableTime";

type Props = {};
function page({}: Props) {
  return (
    <div className="flex flex-col text-primary bg-base-200 flex-1 p-4 gap-4">
      <SearchTime />
      <TableTime />
    </div>
  );
}
export default page;
