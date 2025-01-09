import Link from "next/link";
import NavBar from "./components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavBar />
      <section className="py-10 lg:h-screen bg-slate-100">
        <div className="container mx-auto px-14">
          <div className="flex flex-wrap lg:items-center">
            <div className="md:w-1/2 px-6 py-12">
              <h1 className="text-5xl leading-tight text-green-600 font-bold text-center lg:text-left mb-5">
                Order hidangan sehatmu di
                <p className="font-extrabold text-amber-500">Dietary Apps</p>
              </h1>
              <p className="text-gray-600 text-center lg:text-left lg:max-w-md font-medium mb-6">
                Dietary Apps adalah aplikasi untuk membantu pengguna mengelola
                pola makan dan gaya hidup sehat.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/dietary"
                  className="text-white bg-green-600 font-medium rounded-full px-6 py-3 text-center hover:bg-green-500 transition duration-300 ease-in-out shadow-md transform hover:-translate-y-1"
                >
                  Kelola Diet
                </Link>
              </div>
            </div>
            <div className="w-full max-w-xl mx-auto lg:w-1/2">
              <Image
                className="object-cover w-full h-auto rounded-lg shadow-lg "
                src="/hermina.JPG"
                alt="Hidangan Sehat"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
