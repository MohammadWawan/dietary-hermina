"use client";

import { BackDietary, SubmitButton } from "@/app/components/button";
import { SaveDietary } from "@/lib/actions";
import { useState } from "react";
import { useFormState } from "react-dom";

const dietaryForm: React.FC = () => {
  const [state, formAction] = useFormState(SaveDietary, null);
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<{ years: number; months: number } | null>(
    null
  );

  const calculateAge = (
    dateString: string
  ): { years: number; months: number } => {
    const birthDate = new Date(dateString);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12; // Menambahkan 12 bulan jika bulan lahir lebih besar
    }

    if (today.getDate() < birthDate.getDate()) {
      months--; // Mengurangi bulan jika tanggal hari ini belum melewati tanggal lahir
      if (months < 0) {
        years--;
        months += 12; // Menyesuaikan tahun jika bulan menjadi negatif
      }
    }

    return { years, months };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBirthDate(value);
    if (value) {
      const { years, months } = calculateAge(value);
      setAge({ years, months });
    } else {
      setAge(null);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    // Tambahkan umur yang dihitung ke dalam formData
    if (age) {
      const umur = `${age.years} tahun ${age.months} bulan`;
      formData.append("umur", umur);
    }

    // Kirim data form yang sudah ditambahkan umur ke backend
    formAction(formData);
  };
  return (
    <div className="w-full max-w-screen-md mx-auto pt-10 mb-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-lg p-8 mb-4 bg-white dark:bg-gray-800"
      >
        <div className="pt-12">
          <BackDietary />
        </div>
        <h1 className="text-center p-4 font-waterfall text-5xl text-green-600 font-bold">
          Tambah Dietary
        </h1>

        <div className="mb-6">
          <label
            htmlFor="mrn"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Nomor MRN
          </label>
          <input
            type="text"
            id="mrn"
            name="mrn"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="148****"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.mrn}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="nama"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Nama Pasien
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nama pasien"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.nama}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="tanggal_lahir"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="tanggal_lahir"
            value={birthDate}
            onChange={handleChange}
            name="tanggal_lahir"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.tanggal_lahir}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="umur"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Umur
          </label>
          <input
            type="text"
            id="umur"
            name="umur"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tahun & bulan"
            value={
              age !== null ? age.years + " Tahun " + age.months + " Bulan" : ""
            }
            readOnly
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.umur}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="dpjp"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Nama DPJP
          </label>
          <input
            type="text"
            id="dpjp"
            name="dpjp"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nama dpjp"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.dpjp}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="perawat"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Nama Perawat
          </label>
          <input
            type="text"
            id="perawat"
            name="perawat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nama perawat"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.perawat}</p>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="ruangan"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Ruangan
          </label>
          <input
            type="text"
            id="ruangan"
            name="ruangan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nomor ruangan"
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.ruangan}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="diet"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Diet
          </label>
          <textarea
            id="diet"
            name="diet"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tuliskan diet pasien disini..."
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.diet}</p>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="keterangan"
            className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="keterangan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tuliskan keterangan tambahan disini..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.keterangan}
            </p>
          </div>
        </div>
        <SubmitButton label="save" />
      </form>
    </div>
  );
};

export default dietaryForm;
