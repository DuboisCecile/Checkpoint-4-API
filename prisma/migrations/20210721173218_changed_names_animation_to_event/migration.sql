/*
  Warnings:

  - You are about to drop the column `animationId` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the `animation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `animationreview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Registration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `animation` DROP FOREIGN KEY `animation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `animation` DROP FOREIGN KEY `animation_ibfk_2`;

-- DropForeignKey
ALTER TABLE `animationreview` DROP FOREIGN KEY `animationreview_ibfk_1`;

-- DropForeignKey
ALTER TABLE `animationreview` DROP FOREIGN KEY `animationreview_ibfk_2`;

-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `registration_ibfk_1`;

-- AlterTable
ALTER TABLE `registration` DROP COLUMN `animationId`,
    ADD COLUMN `eventId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `animation`;

-- DropTable
DROP TABLE `animationreview`;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `language` VARCHAR(100) NOT NULL,
    `startDateTime` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `maxAvailablePlaces` INTEGER NOT NULL,
    `availablePlaces` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `videoLink` VARCHAR(255) NOT NULL,
    `guideId` INTEGER NOT NULL,
    `siteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventReview` (
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventReview` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventReview` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
