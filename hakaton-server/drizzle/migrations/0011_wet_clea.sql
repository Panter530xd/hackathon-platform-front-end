ALTER TABLE `groups` ADD PRIMARY KEY (`academy_id`);
ALTER TABLE `groups` MODIFY COLUMN `academy_id` serial AUTO_INCREMENT NOT NULL;