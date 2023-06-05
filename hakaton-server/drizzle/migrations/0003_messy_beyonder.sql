CREATE TABLE `academies` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL);

CREATE TABLE `groups` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`academy_id` varchar(256) NOT NULL);
