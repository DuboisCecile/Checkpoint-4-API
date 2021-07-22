/*
  Warnings:

  - Added the required column `label` to the `GemsCost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gemscost` ADD COLUMN `label` VARCHAR(255) NOT NULL;
