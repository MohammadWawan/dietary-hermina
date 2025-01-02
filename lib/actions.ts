"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const dietarySchema = z.object({
  mrn: z.string().min(10),
  nama: z.string().min(6),
  tanggal_lahir: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Tanggal lahir tidak valid",
  }),
  umur: z
    .string()
    .min(1)
    .refine(
      (value) => {
        // Validasi untuk format umur yang sesuai, contoh "25 tahun 3 bulan"
        return /^[0-9]+ tahun [0-9]+ bulan$/.test(value);
      },
      {
        message:
          "Umur harus dalam format 'X tahun Y bulan' (misalnya '25 tahun 3 bulan')",
      }
    ),
  dpjp: z.string().min(5),
  perawat: z.string().min(5),
  ruangan: z.string().min(2),
  diet: z.string().min(2),
  keterangan: z.string(),
});

export const SaveDietary = async (prevSate: any, formData: FormData) => {
  const validatedFields = dietarySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const tanggalLahir = new Date(validatedFields.data.tanggal_lahir);

  if (isNaN(tanggalLahir.getTime())) {
    return { message: "Tanggal lahir tidak valid" };
  }
  try {
    await prisma.dietary.create({
      data: {
        mrn: validatedFields.data.mrn,
        nama: validatedFields.data.nama,
        tanggal_lahir: tanggalLahir,
        umur: validatedFields.data.umur,
        dpjp: validatedFields.data.dpjp,
        perawat: validatedFields.data.perawat,
        ruangan: validatedFields.data.ruangan,
        diet: validatedFields.data.diet,
        keterangan: validatedFields.data.keterangan,
      },
    });
  } catch (error) {
    return { message: "Failed to create dietary" };
  }

  revalidatePath("/dietary");
  redirect("/dietary");
};

export const updateDietary = async (
  id: string,
  prevSate: any,
  formData: FormData
) => {
  const validatedFields = dietarySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const tanggalLahir = new Date(validatedFields.data.tanggal_lahir);

  if (isNaN(tanggalLahir.getTime())) {
    return { message: "Tanggal lahir tidak valid" };
  }
  try {
    await prisma.dietary.update({
      data: {
        mrn: validatedFields.data.mrn,
        nama: validatedFields.data.nama,
        tanggal_lahir: tanggalLahir,
        umur: validatedFields.data.umur,
        dpjp: validatedFields.data.dpjp,
        perawat: validatedFields.data.perawat,
        ruangan: validatedFields.data.ruangan,
        diet: validatedFields.data.diet,
        keterangan: validatedFields.data.keterangan,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update dietary" };
  }

  revalidatePath("/dietary");
  redirect("/dietary");
};

export const deleteDietary = async (id: string): Promise<void> => {
  try {
    // Hapus data dietary berdasarkan ID
    await prisma.dietary.delete({
      where: { id },
    });

    // Revalidate path setelah penghapusan
    revalidatePath("/dietary");
  } catch (error) {
    // Menangani error tanpa mengembalikan objek error
    console.error("Error deleting dietary:", error);
    throw new Error("Failed to delete dietary"); // Bisa lempar error jika perlu
  }
};

export const printDietary = async (
  id: string,
  prevSate: any,
  formData: FormData
) => {
  const validatedFields = dietarySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const tanggalLahir = new Date(validatedFields.data.tanggal_lahir);

  if (isNaN(tanggalLahir.getTime())) {
    return { message: "Tanggal lahir tidak valid" };
  }
  try {
    await prisma.dietary.update({
      data: {
        mrn: validatedFields.data.mrn,
        nama: validatedFields.data.nama,
        tanggal_lahir: tanggalLahir,
        umur: validatedFields.data.umur,
        dpjp: validatedFields.data.dpjp,
        perawat: validatedFields.data.perawat,
        ruangan: validatedFields.data.ruangan,
        diet: validatedFields.data.diet,
        keterangan: validatedFields.data.keterangan,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to print dietary" };
  }

  revalidatePath("/print");
  redirect("/print");
};
