ALTER TABLE `registration` ADD `participation` varchar(256) NOT NULL;
ALTER TABLE `registration` DROP COLUMN `participation_live`;
ALTER TABLE `registration` DROP COLUMN `participation_online`;