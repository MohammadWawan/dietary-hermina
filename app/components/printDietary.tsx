"use client";

import { ReactBarcode } from "react-jsbarcode";
import type { Dietary } from "@prisma/client";
import { useEffect, useState } from "react";

import { formatDate } from "@/lib/utils";
const printTicket = ({ dietary }: { dietary: Dietary }) => {
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
  // Fetch data based on ID to get patient's birth date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/dietary/${dietary.id}`);
        const data = await response.json();
        setBirthDate(data.tanggal_lahir);
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

  return (
    <div className="container">
      <div
        className="ticket-container bg-gray-100"
        style={{ width: "12cm", height: "3cm" }}
      >
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-2">
          <div className="gap-2 justify-between grid-cols-2 p-2 mx-2 flex">
            <div className="text-xl font-semibold truncate ">
              {dietary.nama}
              <p className="text-xs text-gray-500">
                {formatDate(dietary.tanggal_lahir.toString())} | {dietary.umur}
              </p>
            </div>
            <div className="text-xs text-gray-500">{dietary.mrn}</div>
          </div>
          <div className="flex justify-between px-2 mx-2">
            <div className="text-sm font-medium">
              <p>{dietary.dpjp}</p> {dietary.perawat}
              <span className="text-xs text-gray-500">
                {" "}
                | {dietary.ruangan}{" "}
              </span>
            </div>
            <div className="text-sm font-medium">
              {dietary.diet}
              <p className="text-sm text-gray-500">{dietary.keterangan}</p>
            </div>
          </div>
          <div className="flex justify-center text-center font-light ">
            <ReactBarcode value={dietary.mrn} className="text-xs  max-h-20 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default printTicket;
