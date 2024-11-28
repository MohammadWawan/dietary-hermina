"use client";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { MdDelete, MdEditSquare, MdPrint } from "react-icons/md";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteDietary } from "@/lib/actions";
export const CreateButton = () => {
  return (
    <Link
      href="/dietary/dietaryForm"
      className="inline-flex items-center space-x-1 focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      <IoAddSharp size={20} />
      Tambah Data Pasien
    </Link>
  );
};

export const BackDietary = () => {
  return (
    <Link
      href="/dietary"
      className="inline-flex items-center focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      <FaChevronLeft size={20} />
      Kembali
    </Link>
  );
};

export const EditDietary = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/dietary/editDietaryForm/${id}`}
      className="inline-flex items-center focus:outline-none text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-3 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
    >
      <MdEditSquare size={20} />
    </Link>
  );
};
export const DeleteDietary = ({ id }: { id: string }) => {
  const DeleteDietaryWithId = deleteDietary.bind(null, id);
  return (
    <form action={DeleteDietaryWithId}>
      <button className="inline-flex items-center focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        <MdDelete size={20} />
      </button>
    </form>
  );
};

export const PrintDietary = ({ id }: { id: string }) => {
  return (
    <button>
      <Link
        href={`/dietary/printDietary/${id}`}
        className="inline-flex items-center focus:outline-none text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-3 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
      >
        <MdPrint size={20} />
      </Link>
    </button>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const className = clsx(
    "w-full p-4 mt-6 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm",
    {
      "opacity-50 cursor-progress": pending,
    }
  );
  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
