CREATE TABLE `academies` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL);

CREATE TABLE `groups` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`academy_id` varchar(256) NOT NULL);

CREATE TABLE `events` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name_of_event` varchar(256) NOT NULL,
	`location` varchar(256) NOT NULL,
	`type_of_event` varchar(256) NOT NULL,
	`submission_deadline` varchar(256) NOT NULL,
	`start_date` varchar(256) NOT NULL,
	`end_date` varchar(256) NOT NULL,
	`academies_part` varchar(256) NOT NULL,
	`event_info` varchar(256) NOT NULL,
	`client_info` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `food_allergies` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL);
