ALTER TABLE `teams` MODIFY COLUMN `created_at` timestamp NOT NULL;
ALTER TABLE `teams` MODIFY COLUMN `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP;