ALTER TABLE `teams` ADD `register_id` varchar(256) NOT NULL;
ALTER TABLE `teams` ADD `first_name` varchar(256) NOT NULL;
ALTER TABLE `teams` ADD `last_name` varchar(256) NOT NULL;
ALTER TABLE `teams` ADD `academy` varchar(256) NOT NULL;
ALTER TABLE `teams` DROP COLUMN `name`;