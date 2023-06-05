ALTER TABLE `groups` ADD `academy_id` varchar(256) PRIMARY KEY NOT NULL;
ALTER TABLE `groups` DROP COLUMN `academy.id`;