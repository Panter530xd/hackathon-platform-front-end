ALTER TABLE `registration` MODIFY COLUMN `food_allergies` varchar(256);
ALTER TABLE `registration` MODIFY COLUMN `food_preferences` varchar(256);
ALTER TABLE `registration` ADD `created_at` timestamp NOT NULL;
ALTER TABLE `registration` ADD `updated_at` timestamp NOT NULL;