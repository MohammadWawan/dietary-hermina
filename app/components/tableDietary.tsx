import { DeleteDietary, EditDietary, PrintDietary } from "./button";
import {
  getDietaryPages,
  getDietarys,
  getReportCountDietarys,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Pagination from "./pagination";

const isUpdatedWithin24Hours = (updatedAt: string): boolean => {
  if (!updatedAt) return false;

  const updatedDate = new Date(updatedAt);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate.getTime() - updatedDate.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return diffInHours < 24;
};

const tableDietary = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const dietarys = await getDietarys(query, currentPage);
  const totalPages = await getDietaryPages(query);
  const resultCountData = await getReportCountDietarys();

  return (
    <div className="bg-slate-100 px-10 md:h-screen">
      <div className="pt-5 block m-4 p-4 w-full overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-center">MRN</th>
              <th className="py-3 px-6 text-center">Nama Pasien</th>
              <th className="py-3 px-6 text-center">Tanggal Lahir</th>
              <th className="py-3 px-6 text-center">Usia</th>
              <th className="py-3 px-6 text-center">Nama DPJP</th>
              <th className="py-3 px-6 text-center">Nama Perawat</th>
              <th className="py-3 px-6 text-center">Ruangan</th>
              <th className="py-3 px-6 text-center">Diet</th>
              <th className="py-3 px-6 text-center">Keterangan</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dietarys.map((dietary: any) => {
              // Check if the updatedAt is less than 24 hours ago
              const isRecentlyUpdated = isUpdatedWithin24Hours(
                dietary.updatedAt
              );
              return (
                <tr
                  key={dietary.id}
                  className={`bg-white border-b ${
                    isRecentlyUpdated ? "bg-red-200" : ""
                  }`}
                >
                  <td className="py-3 px-6 text-center">{dietary.mrn}</td>
                  <td className="py-3 px-6 text-center">{dietary.nama}</td>
                  <td className="py-3 px-6 text-center">
                    {formatDate(dietary.tanggal_lahir.toString())}
                  </td>
                  <td className="py-3 px-6 text-center">{dietary.umur}</td>
                  <td className="py-3 px-6 text-center">{dietary.dpjp}</td>
                  <td className="py-3 px-6 text-center">{dietary.perawat}</td>
                  <th className="py-3 px-6 text-center">{dietary.ruangan}</th>
                  <td className="py-3 px-6 text-center">{dietary.diet}</td>
                  <td className="py-3 px-6 text-center">
                    {dietary.keterangan}
                  </td>
                  <td className="flex justify-center gap-1 py-5">
                    <EditDietary id={dietary.id} />
                    <DeleteDietary id={dietary.id} />
                    <PrintDietary id={dietary.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-row justify-between gap-2 p-3 mt-3 ">
          <div className="flex gap-2 justify-between">
            <div className="bg-red-100 text-black text-center px-3 py-1 rounded border-2 border-black"></div>
            <div>Pasien Baru / Update Data</div>
          </div>
          <div className="">
            <span className="font-bold text-lg pr-2">Total Pasien :</span>
            <span className="text-gray-600">
              {resultCountData.totalPatient}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default tableDietary;
