CREATE TABLE `aliexpress_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`aliexpress_id` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`original_price` int,
	`image` text,
	`category` varchar(255),
	`rating` varchar(10),
	`reviews` int,
	`shipping` int,
	`shipping_time` varchar(100),
	`in_stock` int DEFAULT 1,
	`url` text,
	`supplier_id` varchar(255),
	`last_synced` timestamp DEFAULT (now()),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `aliexpress_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `aliexpress_products_aliexpress_id_unique` UNIQUE(`aliexpress_id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`aliexpress_product_id` varchar(255),
	`quantity` int NOT NULL,
	`price` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` varchar(255) NOT NULL,
	`user_id` int,
	`email` varchar(320) NOT NULL,
	`status` enum('pending','processing','shipped','delivered','cancelled','refunded') NOT NULL DEFAULT 'pending',
	`total_amount` int NOT NULL,
	`shipping_address` text,
	`shipping_city` varchar(255),
	`shipping_state` varchar(255),
	`shipping_zip` varchar(20),
	`shipping_country` varchar(100),
	`stripe_payment_id` varchar(255),
	`aliexpress_order_id` varchar(255),
	`tracking_number` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_order_id_unique` UNIQUE(`order_id`)
);
