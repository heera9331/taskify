/*
  Warnings:

  - You are about to drop the `_employeetoproject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `TaskBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `TodoBoard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_employeetoproject` DROP FOREIGN KEY `_EmployeeToProject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_employeetoproject` DROP FOREIGN KEY `_EmployeeToProject_B_fkey`;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastActive` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `organization` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `task` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `taskboard` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `todo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `todoboard` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_employeetoproject`;

-- CreateTable
CREATE TABLE `_ProjectEmployees` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProjectEmployees_AB_unique`(`A`, `B`),
    INDEX `_ProjectEmployees_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TaskEmployees` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TaskEmployees_AB_unique`(`A`, `B`),
    INDEX `_TaskEmployees_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoBoard` ADD CONSTRAINT `TodoBoard_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskBoard` ADD CONSTRAINT `TaskBoard_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectEmployees` ADD CONSTRAINT `_ProjectEmployees_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectEmployees` ADD CONSTRAINT `_ProjectEmployees_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TaskEmployees` ADD CONSTRAINT `_TaskEmployees_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TaskEmployees` ADD CONSTRAINT `_TaskEmployees_B_fkey` FOREIGN KEY (`B`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
