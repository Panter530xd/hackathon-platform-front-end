ALTER TABLE `teams` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;
ALTER TABLE `teams` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;