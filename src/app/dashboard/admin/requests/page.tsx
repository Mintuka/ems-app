import RequestsSearch from "@/components/Requests/RequestSearch";

type Props = {};
function page({}: Props) {
  return (
    <div className="flex flex-col text-primary bg-base-200 flex-1 p-4 gap-4">
      <RequestsSearch />
    </div>
  );
}
export default page;
