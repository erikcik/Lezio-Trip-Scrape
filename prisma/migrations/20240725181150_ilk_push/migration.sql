/*
  Warnings:

  - You are about to drop the column `restaurantTitle` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `restaurantLink` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Restaurant` DROP COLUMN `restaurantTitle`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `generalFeatures` LONGTEXT NULL,
    ADD COLUMN `googleType` VARCHAR(191) NULL,
    ADD COLUMN `restaurantLink` LONGTEXT NOT NULL,
    ADD COLUMN `restaurantMenuLink` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `ratingDate` VARCHAR(191) NULL,
    ADD COLUMN `ratingPics` LONGTEXT NULL,
    ADD COLUMN `ratingTitle` VARCHAR(191) NULL,
    ADD COLUMN `ratingWithWho` VARCHAR(191) NULL;
