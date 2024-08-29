CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`date` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`category` text
);
