"use client";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { MdDelete, MdEditSquare, MdPrint } from "react-icons/md";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteDietary } from "@/lib/actions";
import { useEffect, useState } from "react";

export const CreateButton = () => {
  return (
    <Link
      href="/dietary/dietaryForm"
      className="inline-flex items-center space-x-1 focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalState, setModalState] = useState("hidden");
  useEffect(() => {
    if (isModalOpen) {
      setModalState("visible");
    } else {
      setTimeout(() => setModalState("hidden"), 300); // Delay untuk transisi keluar
    }
  }, [isModalOpen]);
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await DeleteDietaryWithId();
      setIsModalOpen(false);
    } catch (error) {
      console.log("Failed to delete dietary:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        className="inline-flex items-center focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        onClick={() => setIsModalOpen(true)}
      >
        <MdDelete size={20} />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-96 modal-content ${
              modalState === "visible"
                ? "modal-content-visible"
                : "modal-content-hidden"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 text-white rounded-lg ${
                  isDeleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-800"
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
