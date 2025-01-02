import NavBar from "../components/navbar";

import { MdPrint } from "react-icons/md";
import { getReportCountDietarys } from "@/lib/data";

const Report = async () => {
  // Panggil fungsi API
  const resultCountData = await getReportCountDietarys();
  // const handleExport = () => {
  //   console.log(resultData);
  // };
  return (
    <div>
      <NavBar />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
            Laporan Dietary
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="justify-between flex flex-row md:flex-wrap">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Ringkasan
              </h2>
              <button
                // onClick={handleExport}
                className="inline-flex items-center gap-2 focus:outline-none text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-8 py-1.5 me-2 mb-3 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Print Report
                <MdPrint size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Berikut adalah ringkasan laporan dietary pasien. Anda dapat
              melihat detail lebih lanjut di bawah.
            </p>
            <div className="flex flex-wrap justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Total Pasien:</h3>
                <p className="text-gray-600">{resultCountData.totalPatient}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report;
