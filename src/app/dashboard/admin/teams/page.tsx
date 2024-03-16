import SearchTeams from "@/components/Teams/SearchTeams";
import Table from "@/components/Teams/TableTeams";

type Props = {};
export const metadata = {
  title: `${process.env.TITLE} | Admin Teams`,
};

function page({}: Props) {
  return (
    <div className="flex flex-col text-primary bg-base-200 flex-1 p-4 gap-4">
      <SearchTeams />
      <Table />
    </div>
  );
}
export default page;
