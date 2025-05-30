"use client";

import { ReactBarcode } from "react-jsbarcode";
import type { Dietary } from "@prisma/client";
import { useEffect, useState } from "react";
import { formatDate, formatDateLahir } from "@/lib/utils";
import { BackDietary } from "./button";
import { IoPrintSharp } from "react-icons/io5";

const PrintTicket = ({ dietary }: { dietary: Dietary }) => {
  const [Age, SetAge] = useState<{ years: number; months: number } | null>(
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
      months += 12;
    }

    if (today.getDate() < birthDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return { years, months };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/dietary/${dietary.id}`);
        const data = await response.json();
        if (data.tanggal_lahir) {
          const { years, months } = calculateAge(data.tanggal_lahir);
          SetAge({ years, months });
        }
      } catch (error) {
        console.error("Error fetching dietary data:", error);
      }
    };

    fetchData();
  }, [dietary.id]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 print:bg-white">
      {/* Tombol Navigasi & Cetak */}
      <div className="mb-4 flex gap-2 no-print">
        <BackDietary />
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-3"
        >
          <IoPrintSharp />
          Cetak
        </button>
      </div>

      {/* Tiket Ukuran 20cm x 5cm */}
      <div
        className="bg-white p-2 flex flex-col justify-between"
        style={{ width: "20cm", height: "5cm" }}
      >
        <div className="flex flex-row justify-between h-[80%]">
          {/* Kolom Info Pasien */}
          <div className="flex flex-col justify-between text-[18px] w-[30%]">
            <div className="font-bold">{dietary.nama}</div>
            <div className="font-bold">
              {formatDateLahir(dietary.tanggal_lahir.toString())}
            </div>
            <div className="font-bold">
              {Age ? `${Age.years}th ${Age.months}bl` : dietary.umur}
            </div>
            <div className="font-bold">{dietary.mrn}</div>
          </div>

          {/* Kolom Info Diet */}
          <div className="flex flex-col justify-between text-[18px] w-[40%]">
            <div className="font-bold">Diet: {dietary.diet}</div>
            <div className="whitespace-normal break-words font-bold">
              {dietary.keterangan}
            </div>
            <div className="font-bold">DPJP: {dietary.dpjp}</div>
            <div className="font-bold">
              Perawat: {dietary.perawat} | {dietary.ruangan}{" "}
            </div>
          </div>

          {/* Kolom Barcode */}
          <div className="flex items-center justify-center w-[25%] h-full">
            <ReactBarcode value={dietary.mrn} />
          </div>
        </div>

        {/* Teks Imbauan */}
        <div className="text-center text-[20px] font-extrabold leading-tight mt-1">
          <p>Agar citarasa makanan tidak berubah, </p>
          <p>mohon segera dimakan selambatnya 30 menit setelah disajikan.</p>
        </div>
      </div>

      {/* Gaya Cetak */}
      <style>{`
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintTicket;
