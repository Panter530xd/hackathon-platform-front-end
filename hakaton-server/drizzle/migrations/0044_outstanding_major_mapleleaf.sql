ALTER TABLE `teams` MODIFY COLUMN `created_at` timestamp NOT NULL DEFAULT (now());
ALTER TABLE `teams` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;