import Link from "next/link";
import NavBar from "../components/navbar";
import Image from "next/image";
export default function about() {
  return (
    <div>
      <NavBar />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
            Tentang Dietary Apps
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Misi Kami
            </h2>
            <p className="text-gray-600 mb-6">
              Dietary Apps bertujuan untuk membantu pengguna dalam mengelola
              pola makan dan gaya hidup sehat. Kami percaya bahwa setiap
              individu berhak mendapatkan akses ke informasi dan alat yang dapat
              membantu mereka mencapai tujuan kesehatan mereka.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Apa yang Kami Tawarkan?
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Pengelolaan diet yang mudah dan terstruktur.</li>
              <li>
                Rekomendasi makanan berdasarkan preferensi dan kebutuhan
                kesehatan.
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Tim Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
              <div className="bg-gray-100 rounded-lg p-4 shadow-md ">
                <Image
                  src="/wawan.jpg"
                  alt="Tim A"
                  className="w-full h-48 lg:h-auto object-cover rounded-t-lg"
                  width={300}
                  height={300}
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-2 ">
                  Mohammad Wawan
                </h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-gray-600 mb-4">
              Kami selalu terbuka untuk saran dan pertanyaan. Silakan hubungi
              kami di:
            </p>
            <p className="text-gray-600 mb-2">
              Email: itsupport.pasuruan@herminahospitals.com
            </p>
            <p className="text-gray-600">
              Ticket IT RS :
              <span>
                {" "}
                <Link href="https://bit.ly/TicketITHerminaPasuruan">
                  Klik Disini
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
