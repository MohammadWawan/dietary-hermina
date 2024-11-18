import { getDietaryPages } from "@/lib/data";
import { CreateButton } from "../components/button";
import NavBar from "../components/navbar";
import TableDietary from "../components/tableDietary";
import SearchComponent from "@/app/components/search";
import Pagination from "../components/pagination";

const dietary = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <section className="md:h-screen bg-slate-100">
      <NavBar />
      <div className="flex content-end pt-10 m-2 px-16 w-full">
        <CreateButton />
        <SearchComponent />
      </div>
      <TableDietary query={query} currentPage={currentPage} />
    </section>
  );
};
export default dietary;
