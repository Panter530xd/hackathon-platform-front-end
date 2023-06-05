CREATE TABLE `groups` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`academy_id` int);

ALTER TABLE `groups` ADD CONSTRAINT `groups_academy_id_academies_id_fk` FOREIGN KEY (`academy_id`) REFERENCES `academies`(`id`) ON DELETE no action ON UPDATE no action;