-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tytul` VARCHAR(191) NOT NULL,
    `tresc` VARCHAR(191) NOT NULL,
    `dataUtworzenia` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kategoriaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tresc` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `dataDodania` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wpisId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaId_fkey` FOREIGN KEY (`kategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisId_fkey` FOREIGN KEY (`wpisId`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
