ALTER TABLE `groups` DROP PRIMARY KEY
ALTER TABLE `groups` MODIFY COLUMN `academy_id` int;
ALTER TABLE `groups` ADD CONSTRAINT `groups_academy_id_academies_id_fk` FOREIGN KEY (`academy_id`) REFERENCES `academies`(`id`) ON DELETE no action ON UPDATE no action;