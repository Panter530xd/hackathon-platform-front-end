CREATE TABLE `events` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name_of_event` varchar(256),
	`location` varchar(256),
	`type_of_event` varchar(256),
	`submission_deadline` varchar(256),
	`start_date` varchar(256),
	`end_date` varchar(256),
	`academies_part` varchar(256),
	`event_info` varchar(256),
	`client_info` varchar(256));
