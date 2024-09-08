-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `restaurantExplanation` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `webResults` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `link` LONGTEXT NULL,
    `content` LONGTEXT NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `webResults` ADD CONSTRAINT `webResults_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
