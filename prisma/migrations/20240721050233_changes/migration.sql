-- DropIndex
DROP INDEX `Project_creatorId_fkey` ON `project`;

-- AlterTable
ALTER TABLE `employee` MODIFY `lastActive` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
