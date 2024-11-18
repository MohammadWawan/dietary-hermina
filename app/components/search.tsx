"use client";

import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // State untuk menyimpan teks pencarian
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );

  // Fungsi untuk menangani pencarian dengan debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset ke halaman pertama saat mencari
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  // Update state `searchTerm` ketika searchParams berubah
  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  // Fungsi untuk menghapus teks pencarian dan mengosongkan query di URL
  const handleClear = () => {
    setSearchTerm(""); // Menghapus nilai dari state
    const params = new URLSearchParams(searchParams);
    params.delete("query"); // Menghapus query parameter
    params.set("page", "1"); // Reset ke halaman pertama
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex rounded-md border-2 text-sm px-5 py-2.5 me-2 mb-3 bg-white border-green-600 overflow-hidden max-w-md mx-auto font-[sans-serif]">
      <input
        type="text"
        placeholder="Cari diet pasien..."
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        onChange={(e) => {
          setSearchTerm(e.target.value); // Update nilai pencarian pada state
          handleSearch(e.target.value); // Menjalankan pencarian dengan debounce
        }}
        value={searchTerm} // Mengikat input dengan state
      />

      {/* Tombol X untuk menghapus teks pencarian */}
      {searchTerm && (
        <IoClose
          size={20}
          className="cursor-pointer   text-gray-500"
          onClick={handleClear}
        />
      )}

      <MdSearch size={20} />
    </div>
  );
};

export default SearchComponent;
