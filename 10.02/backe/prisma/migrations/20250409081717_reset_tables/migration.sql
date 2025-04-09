/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Kategoria" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,

    CONSTRAINT "Kategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wpis" (
    "id" SERIAL NOT NULL,
    "tytul" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,
    "dataUtworzenia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kategoriaId" INTEGER,

    CONSTRAINT "Wpis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komentarz" (
    "id" SERIAL NOT NULL,
    "tresc" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "dataDodania" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wpisId" INTEGER NOT NULL,

    CONSTRAINT "Komentarz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wpis" ADD CONSTRAINT "Wpis_kategoriaId_fkey" FOREIGN KEY ("kategoriaId") REFERENCES "Kategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentarz" ADD CONSTRAINT "Komentarz_wpisId_fkey" FOREIGN KEY ("wpisId") REFERENCES "Wpis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
