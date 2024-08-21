CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`date` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`category` text
);
