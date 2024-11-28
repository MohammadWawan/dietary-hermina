-- CreateTable
CREATE TABLE "Dietary" (
    "id" TEXT NOT NULL,
    "mrn" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "umur" TEXT NOT NULL,
    "dpjp" TEXT NOT NULL,
    "perawat" TEXT NOT NULL,
    "ruangan" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dietary_pkey" PRIMARY KEY ("id")
);
