"use client";

import { BackDietary, SubmitButton } from "@/app/components/button";
import { updateDietary } from "@/lib/actions";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import type { Dietary } from "@prisma/client";

const UpdateDietaryForm = ({ dietary }: { dietary: Dietary }) => {
  const updateDietaryWithid = updateDietary.bind(null, dietary.id);
  const [state, formAction] = useFormState(updateDietaryWithid, null);
  const [birthDate, SetBirthDate] = useState<string>("");
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
  // Fetch data based on ID to get patient's birth date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/dietary/${dietary.id}`);
        const data = await response.json();
        SetBirthDate(data.tanggal_lahir);
        if (data.tanggal_lahir) {
          const { years, months } = calculateAge(data.tanggal_lahir);
          setAge({ years, months });
        }
      } catch (error) {
        console.error("Error fetching dietary data:", error);
      }
    };

    fetchData();
  }, [dietary.id]); // Run the effect when the dietary id changes

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    SetBirthDate(value);
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

    // Ensure 'umur' is formatted as "X tahun Y bulan"
    if (age) {
      const umur = `${age.years} tahun ${age.months} bulan`; // Properly formatted string
      formData.append("umur", umur);
    }

    // Send form data to the backend
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
          Update Dietary
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
            defaultValue={dietary.mrn}
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
            defaultValue={dietary.nama}
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
            defaultValue={
              dietary.tanggal_lahir
                ? dietary.tanggal_lahir.toISOString().slice(0, 16)
                : ""
            }
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
            defaultValue={age ? `${age.years} Tahun ${age.months} Bulan` : ""}
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
            defaultValue={dietary.dpjp}
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
            defaultValue={dietary.perawat}
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
            defaultValue={dietary.ruangan}
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
            defaultValue={dietary.diet}
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
            defaultValue={dietary.keterangan}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tuliskan keterangan tambahan disini..."
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.keterangan}
            </p>
          </div>
        </div>
        <SubmitButton label="update" />
      </form>
    </div>
  );
};

export default UpdateDietaryForm;
