/*
  Warnings:

  - Made the column `folderId` on table `File` required. This step will fail if there are existing NULL values in that column.
  - Made the column `folderId` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_folderId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "folderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "folderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
