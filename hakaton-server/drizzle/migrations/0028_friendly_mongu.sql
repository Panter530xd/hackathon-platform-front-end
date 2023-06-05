ALTER TABLE `groups` DROP FOREIGN KEY `groups_academy_id_academies_id_fk`;

ALTER TABLE `groups` MODIFY COLUMN `academy_id` varchar(256) NOT NULL;