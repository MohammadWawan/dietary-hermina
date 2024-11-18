import { prisma } from "../lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getDietarys = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const dietarys = await prisma.dietary.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { mrn: { contains: query, mode: "insensitive" } },
          { nama: { contains: query, mode: "insensitive" } },
          { diet: { contains: query, mode: "insensitive" } },
          { dpjp: { contains: query, mode: "insensitive" } },
          { perawat: { contains: query, mode: "insensitive" } },
          { keterangan: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return dietarys;
  } catch (error) {
    throw new Error("Failed to fetch dietary data");
  }
};

export const getDietarysById = async (id: string) => {
  try {
    const dietarys = await prisma.dietary.findUnique({
      where: { id },
    });
    return dietarys; // Mengembalikan data jika ada
  } catch (error: any) {
    // Menangani kesalahan dengan log lebih rinci
    console.error("Error fetching dietary data:", error.message);
    throw new Error(`Failed to fetch dietary data: ${error.message}`);
  }
};

export const getDietaryPages = async (query: string) => {
  try {
    const dietarys = await prisma.dietary.count({
      where: {
        OR: [
          { mrn: { contains: query, mode: "insensitive" } },
          { nama: { contains: query, mode: "insensitive" } },
          { diet: { contains: query, mode: "insensitive" } },
          { dpjp: { contains: query, mode: "insensitive" } },
          { perawat: { contains: query, mode: "insensitive" } },
          { keterangan: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    const totalPages = Math.ceil(Number(dietarys) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch dietary data");
  }
};
