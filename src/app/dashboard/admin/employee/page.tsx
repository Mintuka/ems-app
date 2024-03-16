import AddEmployerModal from "@/components/Employes/AddEmployerModal";
import Search from "@/components/Employes/Search";
import Table from "@/components/Employes/Table";

type Props = {};
async function page({}: Props) {
  return (
    <div className="flex flex-col text-primary bg-base-200 flex-1 p-4 gap-4">
      <Search />
      <Table />
      {/* <AddEmployerModal /> */}
    </div>
  );
}
export default page;
