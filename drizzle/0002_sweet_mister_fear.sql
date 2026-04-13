CREATE TABLE `stripe_payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripe_payment_intent_id` varchar(255) NOT NULL,
	`order_id` varchar(255),
	`user_id` int,
	`email` varchar(320) NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'usd',
	`status` enum('pending','succeeded','failed','canceled') NOT NULL DEFAULT 'pending',
	`payment_method` varchar(255),
	`receipt_url` text,
	`metadata` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripe_payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripe_payments_stripe_payment_intent_id_unique` UNIQUE(`stripe_payment_intent_id`)
);
--> statement-breakpoint
CREATE TABLE `stripe_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripe_subscription_id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`stripe_customer_id` varchar(255) NOT NULL,
	`stripe_price_id` varchar(255) NOT NULL,
	`status` enum('active','paused','canceled','incomplete','incomplete_expired') NOT NULL DEFAULT 'active',
	`current_period_start` timestamp,
	`current_period_end` timestamp,
	`canceled_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripe_subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripe_subscriptions_stripe_subscription_id_unique` UNIQUE(`stripe_subscription_id`)
);
