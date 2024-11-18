import NavBar from "../components/navbar";

export default function report() {
  return (
    <div>
      <NavBar />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
            Laporan Dietary
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ringkasan
            </h2>
            <p className="text-gray-600 mb-4">
              Berikut adalah ringkasan laporan dietary pasien. Anda dapat
              melihat detail lebih lanjut di bawah.
            </p>
            <div className="flex flex-wrap justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">Total Pasien:</h3>
                <p className="text-gray-600">50</p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Diet Tersedia:</h3>
                <p className="text-gray-600">Vegan, Vegetarian, Ketogenic</p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Rata-rata Umur:</h3>
                <p className="text-gray-600">30 tahun</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Detail Pasien
            </h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Nama Pasien
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Tanggal Lahir
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Diet
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">01/01/1990</td>
                  <td className="py-2 px-4">Vegan</td>
                  <td className="py-2 px-4 text-green-600 font-semibold">
                    Sehat
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4">05/03/1985</td>
                  <td className="py-2 px-4">Ketogenic</td>
                  <td className="py-2 px-4 text-red-600 font-semibold">
                    Perlu Perhatian
                  </td>
                </tr>
                {/* Tambahkan lebih banyak baris sesuai kebutuhan */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
