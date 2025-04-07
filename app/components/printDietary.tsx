"use client";

import { ReactBarcode } from "react-jsbarcode";
import type { Dietary } from "@prisma/client";
import { useEffect, useState } from "react";

import { formatDate } from "@/lib/utils";
import { BackDietary } from "./button";
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

        if (data.tanggal_lahir) {
          const { years, months } = calculateAge(data.tanggal_lahir);
          SetAge({ years, months });
        }
      } catch (error) {
        console.error("Error fetching dietary data:", error);
      }
    };

    fetchData();
  }, [dietary.id]); // Run the effect when the dietary id changes

  return (
    <div className="container">
      <div
        className="ticket-container "
        style={{ width: "12cm", height: "5cm" }}
      >
        <div className="bg-white p-2 justify-center mx-4">
          <div className="gap-2 grid grid-cols-4">
            <div className="text-sm font-semibold truncate">
              <span className="text-xs">{dietary.nama}</span>
              <p className="text-xs text-gray-500">
                {formatDate(dietary.tanggal_lahir.toString())}
              </p>
              <p className="text-xs text-gray-500">{dietary.umur}</p>
              <p className="text-xs text-gray-500">{dietary.mrn}</p>
            </div>
            <div className="text-xs font-medium">
              diet : {dietary.diet} <br />
              <span className="text-[10px] text-gray-500">
                {dietary.keterangan}
              </span>
              <p className="text-[10px]">{dietary.dpjp}</p>
              <span className="text-[10px]">{dietary.perawat}</span>
              <span className="text-xs text-gray-500">
                {" "}
                | {dietary.ruangan}{" "}
              </span>
            </div>
            <div className="flex justify-start mt-2 font-semibold">
              <ReactBarcode value={dietary.mrn} className="max-h-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintTicket;
